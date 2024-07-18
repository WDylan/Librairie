import { Component, OnInit } from '@angular/core';
import User from '../../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

users: User[] = []; // Propriété pour stocker la liste des utilisateurs
currentPage: number = 1; // Propriété pour stocker la page actuelle
totalPages!: number; // Propriété pour stocker le nombre total de pages
limit: number = 12; // Propriété pour définir le nombre de livres par page

// Constructeur du composant, injecte UserService
}
