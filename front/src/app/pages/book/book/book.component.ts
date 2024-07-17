import { Component, OnInit } from '@angular/core';
import { BookDetailsComponent } from "./book-details/book-details.component";
import Book from '../../../models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [BookDetailsComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  detail!: Book; // Propriété pour stocker les détails du livre

  // Constructeur du composant, injecte Router, ActivatedRoute et BookService
  constructor(private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService) {
  }

  // Méthode privée pour s'abonner aux détails du livre
  private subscribeBook(id: number) {
    this.bookService.getBook(id).subscribe((response) => {
      this.detail = response; // Met à jour la propriété detail avec la réponse
    });
  }

  // Méthode privée pour vérifier et s'abonner au livre en fonction de l'ID
  private setSubscribe(id: string | null) {
    if (id && !isNaN(+id)) {
      this.subscribeBook(+id); // Si l'ID est valide, s'abonner aux détails du livre
    } else if (!id) {
      this.router.navigate(['not-found']); // Si l'ID est nul, rediriger vers la page "not-found"
    }
  }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Récupère l'ID du livre depuis les paramètres de la route
    this.setSubscribe(id); // Appelle la méthode setSubscribe avec l'ID récupéré
  }
}
