import { Component, Input } from '@angular/core';
import { BookCardComponent } from '../book-card/book-card.component';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink, BookCardComponent, CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  @Input() books: any[] = []; // Propriété d'entrée pour recevoir la liste des livres

  role: string | null = null; // Propriété pour stocker le rôle de l'utilisateur

  // Constructeur du composant, injecte UserService
  constructor(private userService: UserService) { }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Récupère le rôle de l'utilisateur depuis le UserService
    this.role = this.userService.getRole();
  }
}
