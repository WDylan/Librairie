import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

// Décorateur Injectable pour indiquer qu'il s'agit d'un service injectable
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // Méthode intercept pour intercepter les requêtes HTTP
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // Récupération du token depuis le localStorage
    if (token) { // Si un token est présent
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`) // Ajout du token dans les en-têtes de la requête
      });
      return next.handle(cloned); // Passe la requête clonée avec le token
    } else {
      return next.handle(req); // Passe la requête originale sans modification
    }
  }
}
