import { Component } from '@angular/core';
import Login from '../../models/login.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials: Login = { username: '', password: '' };

  constructor(private userService: UserService, private router: Router) { }

  login() {
    // Appelle le service de connexion avec les informations de connexion
    this.userService.login(this.credentials).subscribe({
      next: (response) => {
        // En cas de succès, stocke le token dans le localStorage et redirige vers la page d'accueil
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        // En cas d'erreur, affiche un message d'erreur dans la console
        console.error('Login failed', err);
      }
    });
  }
}
