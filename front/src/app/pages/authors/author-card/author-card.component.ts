import { CommonModule, SlicePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-author-card',
  standalone: true,
  imports: [RouterLink, SlicePipe, CommonModule],
  templateUrl: './author-card.component.html',
  styleUrl: './author-card.component.css'
})
export class AuthorCardComponent {

  @Input() author!: any; // Propriété d'entrée pour recevoir les détails de l'auteur

  role: string | null = null; // Propriété pour stocker le rôle de l'utilisateur

  // Constructeur du composant, injecte UserService
  constructor(private userService: UserService) { }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Récupère le rôle de l'utilisateur depuis le UserService
    this.role = this.userService.getRole();
  }
}
