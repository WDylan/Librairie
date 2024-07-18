import { Component } from '@angular/core';
import Login from '../../interfaces/login';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials: Login = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    // Réinitialise le message d'erreur
    this.errorMessage = '';

    // Appelle le service de connexion avec les informations de connexion
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        // En cas de succès, stocke le token dans le localStorage et redirige vers la page d'accueil
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        // En cas d'erreur, affiche un message d'erreur dans la console
        console.error('Login failed', err);
        // Affiche un message d'erreur à l'utilisateur
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    });
  }
}
