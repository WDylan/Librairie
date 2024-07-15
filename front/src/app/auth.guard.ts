import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Décorateur Injectable pour indiquer qu'il s'agit d'un service injectable
@Injectable({
  providedIn: 'root' // Le service est fourni à la racine de l'application
})
export class AuthGuard implements CanActivate { // Implémentation de l'interface CanActivate
  constructor(private router: Router) { } // Injection du service Router dans le constructeur

  // Méthode canActivate qui détermine si une route peut être activée
  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Récupération du token depuis le localStorage
    if (token) { // Si un token est présent
      return true; // Autoriser l'activation de la route
    } else { // Sinon
      this.router.navigate(['/login']); // Rediriger vers la page de login
      return false; // Bloquer l'activation de la route
    }
  }
}
