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
    this.userService.login(this.credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}
