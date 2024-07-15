import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AuthGuard } from './auth.guard';

// Définition du bloc de tests pour AuthGuard
describe('AuthGuard', () => {
  let authGuard: AuthGuard; // Déclaration de la variable pour AuthGuard
  let router: Router; // Déclaration de la variable pour Router

  // Configuration du module de test avant chaque test
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard, // Fourniture du service AuthGuard
        provideRouter([]) // Utilisation de provideRouter pour configurer le routeur
      ]
    });

    authGuard = TestBed.inject(AuthGuard); // Injection du service AuthGuard
    router = TestBed.inject(Router); // Injection du service Router
  });

  // Test pour vérifier que AuthGuard est créé
  it('should be created', () => {
    expect(authGuard).toBeTruthy(); // Vérifie que authGuard est défini
  });

  // Test pour vérifier que l'activation est autorisée si un token existe
  it('should allow activation if token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fake-token'); // Simule la présence d'un token dans localStorage
    expect(authGuard.canActivate()).toBe(true); // Vérifie que canActivate retourne true
  });

  // Test pour vérifier la redirection vers la page de login si aucun token n'existe
  it('should redirect to login if no token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Simule l'absence de token dans localStorage
    const navigateSpy = spyOn(router, 'navigate'); // Espionne la méthode navigate du routeur
    expect(authGuard.canActivate()).toBe(false); // Vérifie que canActivate retourne false
    expect(navigateSpy).toHaveBeenCalledWith(['/login']); // Vérifie que la méthode navigate a été appelée avec ['/login']
  });
});
