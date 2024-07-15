import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        provideRouter([]) // Utilisez provideRouter pour configurer le routeur
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow activation if token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fake-token');
    expect(authGuard.canActivate()).toBe(true);
  });

  it('should redirect to login if no token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const navigateSpy = spyOn(router, 'navigate');
    expect(authGuard.canActivate()).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
