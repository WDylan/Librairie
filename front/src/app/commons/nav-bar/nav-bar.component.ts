import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-nav-bar', 
  standalone: true, 
  imports: [RouterLink, CommonModule], 
  templateUrl: './nav-bar.component.html', 
  styleUrl: './nav-bar.component.css' 
})
export class NavBarComponent {
  isLoggedIn$: Observable<boolean>; // Observable pour suivre l'état de connexion de l'utilisateur

  // Constructeur du composant, injecte le service UserService
  constructor(private userService: UserService) {
    this.isLoggedIn$ = this.userService.isLoggedIn$; // Initialise l'Observable avec celui du service
  }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {}

  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    this.userService.logout(); // Appelle la méthode logout du service UserService
  }
}
