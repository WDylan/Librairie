import { Component } from '@angular/core';
import { AuthorListComponent } from './author-list/author-list.component';
import Author from '../../models/author.model';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [AuthorListComponent],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {
  authors: Author[] = []; // Propriété pour stocker la liste des auteurs
  currentPage: number = 1; // Propriété pour stocker la page actuelle
  totalPages: number = 0; // Propriété pour stocker le nombre total de pages
  limit: number = 12; // Propriété pour définir le nombre d'auteurs par page

  // Constructeur du composant, injecte AuthorService
  constructor(private authorService: AuthorService) { }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Charge les auteurs pour la page actuelle
    this.loadAuthors();
  }

  // Méthode pour charger les auteurs paginés
  loadAuthors(): void {
    // Appelle le service pour récupérer les auteurs paginés
    this.authorService.getAuthorsPaginated(this.currentPage, this.limit).subscribe(data => {
      this.authors = data; // Met à jour la liste des auteurs
      this.totalPages = Math.ceil(data.length / this.limit); // Calcule le nombre total de pages
    });
  }

  // Méthode pour passer à la page suivante
  nextPage(): void {
    if (this.currentPage < this.totalPages) { // Vérifie s'il y a une page suivante
      this.currentPage++; // Incrémente le numéro de la page actuelle
      this.loadAuthors(); // Recharge les auteurs pour la nouvelle page
    }
  }

  // Méthode pour revenir à la page précédente
  previousPage(): void {
    if (this.currentPage > 1) { // Vérifie s'il y a une page précédente
      this.currentPage--; // Décrémente le numéro de la page actuelle
      this.loadAuthors(); // Recharge les auteurs pour la nouvelle page
    }
  }
}
