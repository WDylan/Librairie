import { Component, OnInit } from '@angular/core';
import Book from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { BookListComponent } from './book-list/book-list.component';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [BookListComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {

  books: Book[] = []; // Propriété pour stocker la liste des livres
  currentPage: number = 1; // Propriété pour stocker la page actuelle
  totalPages!: number; // Propriété pour stocker le nombre total de pages
  limit: number = 12; // Propriété pour définir le nombre de livres par page

  // Constructeur du composant, injecte BookService
  constructor(
    private bookService: BookService
  ) { }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Charge les livres pour la page actuelle
    this.loadBooks();
  }

  // Méthode pour charger les livres paginés
  loadBooks(): void {
    // Appelle le service pour récupérer les livres paginés
    this.bookService.getBooksPaginated(this.currentPage, this.limit).subscribe(data => {
      this.books = data; // Met à jour la liste des livres
      this.totalPages = Math.ceil(data.length / this.limit); // Calcule le nombre total de pages
    });
  }

  // Méthode pour passer à la page suivante
  nextPage(): void {
    if (this.currentPage < this.totalPages) { // Vérifie s'il y a une page suivante
      this.currentPage++; // Incrémente le numéro de la page actuelle
      this.loadBooks(); // Recharge les livres pour la nouvelle page
    }
  }

  // Méthode pour revenir à la page précédente
  previousPage(): void {
    if (this.currentPage > 1) { // Vérifie s'il y a une page précédente
      this.currentPage--; // Décrémente le numéro de la page actuelle
      this.loadBooks(); // Recharge les livres pour la nouvelle page
    }
  }
}
