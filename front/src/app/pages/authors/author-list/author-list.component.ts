import { RouterLink } from '@angular/router';
import { Component, Input } from '@angular/core';
import { AuthorCardComponent } from '../author-card/author-card.component';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [RouterLink, AuthorCardComponent, CommonModule],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css'
})
export class AuthorListComponent {
  @Input() authors: any[] = []; // Propriété d'entrée pour recevoir la liste des auteurs

  role: string | null = null; // Propriété pour stocker le rôle de l'utilisateur

  // Constructeur du composant, injecte AuthService
  constructor(private authService: AuthService) { }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Récupère le rôle de l'utilisateur depuis le AuthService
    this.role = this.authService.getRole();
  }
}
