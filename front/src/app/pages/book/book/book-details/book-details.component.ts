import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, Input } from '@angular/core';
import Book from '../../../../models/book.model';
import { BookService } from '../../../../services/book.service';
import { CommonModule } from '@angular/common';
import User from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  bookId: number; // Propriété pour stocker l'ID du livre
  @Input() book: Book | undefined; // Propriété d'entrée pour recevoir les détails du livre
  role: string | null = null; // Propriété pour stocker le rôle de l'utilisateur

  // Constructeur du composant, injecte Router, ActivatedRoute, BookService et UserService
  constructor(private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private userService: UserService) {
    // Récupère l'ID du livre depuis les paramètres de la route et le convertit en nombre
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
  }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Récupère le rôle de l'utilisateur depuis le UserService
    this.role = this.userService.getRole();
  }

  // Méthode pour confirmer la suppression du livre
  confirmDelete(): void {
    // Affiche une boîte de dialogue de confirmation
    if (confirm('Êtes vous sûr de vouloir supprimer le livre ??')) {
      // Si l'utilisateur confirme, appelle la méthode deleteBook
      this.deleteBook();
    }
  }

  // Méthode pour supprimer le livre
  deleteBook(): void {
    // Vérifie si le livre est défini
    if (this.book) {
      // Appelle le service pour supprimer le livre et s'abonne à la réponse
      this.bookService.deleteBook(this.book.id).subscribe(() => {
        // Redirige vers la liste des livres après la suppression
        this.router.navigate(['/books']);
      });
    }
  }
}
