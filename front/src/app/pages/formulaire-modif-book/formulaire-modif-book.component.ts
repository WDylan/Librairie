import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import Book from '../../models/book.model';
import Author from '../../models/author.model';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-formulaire-modif-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './formulaire-modif-book.component.html',
  styleUrl: './formulaire-modif-book.component.css'
})
export class FormulaireModifBookComponent {
  book: FormGroup; // Déclare un formulaire réactif pour le livre
  submitted: boolean = false; // Indique si le formulaire a été soumis
  bookId?: number; // ID du livre à modifier
  authors: Author[] = []; // Liste des auteurs disponibles

  constructor(
    private formBuilder: FormBuilder, // Service pour construire le formulaire
    private route: ActivatedRoute, // Service pour accéder aux informations de la route active
    private router: Router, // Service pour la navigation
    private bookService: BookService, // Service pour les opérations sur les livres
    private authorService: AuthorService // Service pour les opérations sur les auteurs
  ) {
    // Initialise le formulaire avec des champs et des validateurs
    this.book = this.formBuilder.group({
      title: ['', [Validators.required]], // Champ titre, requis
      coverText: ['', [Validators.required]], // Champ texte de couverture, requis
      idAuthor: ['', [Validators.required]], // Champ ID de l'auteur, requis
      comment: ['', [Validators.required]] // Champ commentaire, requis
    });
  }

  ngOnInit(): void {
    // Récupère l'ID du livre à partir des paramètres de la route
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.bookId) {
      // Si l'ID du livre est valide, récupère les données du livre
      this.bookService.getBook(this.bookId).subscribe((data: Book) => {
        const bookData = { ...data, idAuthor: data.author.id }; // Prépare les données du livre pour le formulaire
        this.book.patchValue(bookData); // Met à jour le formulaire avec les données du livre
      });
    }

    // Récupère la liste des auteurs
    this.authorService.getAuthors().subscribe((data: Author[]) => {
      this.authors = data; // Met à jour la liste des auteurs
    });
  }

  onSubmit(): void {
    this.submitted = true; // Marque le formulaire comme soumis
    if (this.book.invalid) {
      return; // Si le formulaire est invalide, ne pas continuer
    }

    if (this.bookId) {
      // Si l'ID du livre est valide, met à jour le livre
      const updatedBook = { ...this.book.value, id: this.bookId };
      this.bookService.updateBook(updatedBook).subscribe({
        next: () => {
          alert('Livre mis à jour avec succès !'); // Affiche un message de succès
          this.router.navigate(['/books']); // Redirige vers la liste des livres
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du livre', error); // Affiche une erreur en cas d'échec
        }
      });
    }
  }

  get form() {
    return this.book.controls; // Getter pour accéder aux contrôles du formulaire
  }
}
