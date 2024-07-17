import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/user.service'; // Importer UserService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // Constructeur du guard, injecte UserService et Router
  constructor(private userService: UserService, private router: Router) { }

  // Méthode canActivate, vérifie si la route peut être activée
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole']; // Rôle attendu pour accéder à la route
    const currentRole = this.userService.getRole(); // Rôle actuel de l'utilisateur

    // Vérifie si l'utilisateur est connecté
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['login']); // Redirige vers la page de login si non connecté
      return false; // Empêche l'activation de la route
    }

    // Vérifie si le rôle de l'utilisateur correspond au rôle attendu
    if (expectedRole && currentRole !== expectedRole) {
      this.router.navigate(['home']); // Redirige vers la page d'accueil si le rôle ne correspond pas
      return false; // Empêche l'activation de la route
    }

    return true; // Autorise l'activation de la route
  }
}
