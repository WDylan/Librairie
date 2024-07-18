import { ApplicationConfig, NgModule, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// Importation des routes définies dans le fichier app.routes.ts
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// Importation des intercepteurs HTTP et de l'intercepteur d'authentification personnalisé
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

// Définition de la configuration de l'application
export const appConfig: ApplicationConfig = {
  providers: [
    // Configuration de la détection de zone avec coalescence des événements
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Fourniture du routeur avec les routes définies
    provideRouter(routes),
    // Fourniture du client HTTP
    provideHttpClient(),
    // Ajout de l'intercepteur d'authentification à la chaîne des intercepteurs HTTP
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};
