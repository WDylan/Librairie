import { UserService } from './../../services/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  user: FormGroup; // Déclaration du formulaire de type FormGroup
  submitted: boolean = false; // Indicateur de soumission du formulaire

  // Constructeur avec injection des services nécessaires
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    this.user = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]], // Ajoutez Validators.email pour valider l'email
      password: ['', [Validators.required]]
    });
  }

  // Méthode privée pour ajouter un utilisateur
  private addUser() {
    const userData = {
      email: this.user.value.username, // Changez 'username' en 'email'
      password: this.user.value.password
    };
    this.userService.register(userData).subscribe({
      next: () => {
        alert("Inscription effectuée avec succès !");
        this.user.reset();
        this.submitted = false;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error("Erreur lors de l'inscription.", error);
        if (error.error) {
          console.error("Détails de l'erreur:", error.error);
        }
      }
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    this.submitted = true; // Indique que le formulaire a été soumis
    if (this.user.invalid) {
      return false;
    } else {
      this.addUser();
      return true;
    }
  }

  // Getter pour accéder facilement aux contrôles du formulaire dans le template
  get form() {
    return this.user.controls;
  }
}
