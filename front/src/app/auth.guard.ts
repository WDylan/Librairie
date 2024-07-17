import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/user.service'; // Importer UserService

@Injectable({
  providedIn: 'root' // Le service est fourni à la racine de l'application
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  // canActivate(): boolean {
  //   const isLoggedIn = this.userService.isLoggedIn();
  //   const role = this.userService.getRole();
  //   console.log('isLoggedIn:', isLoggedIn); // Ajoutez ce log
  //   console.log('role:', role); // Ajoutez ce log

  //   if (isLoggedIn) {
  //     if (role === 'ROLE_ADMIN') {
  //       return true;
  //     } else {
  //       this.router.navigate(['home']);
  //       return false;
  //     }
  //   } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const currentRole = this.userService.getRole();

    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }

    if (expectedRole && currentRole !== expectedRole) {
      this.router.navigate(['home']);
      return false;
    }

    return true;
  }
}
