import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import Author from '../../models/author.model';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-formulaire-ajout-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './formulaire-ajout-book.component.html',
  styleUrl: './formulaire-ajout-book.component.css'
})
export class FormulaireAjoutBookComponent {
  book: FormGroup; // Déclare un formulaire réactif pour le livre
  submitted: boolean = false; // Indique si le formulaire a été soumis
  authors: Author[] = []; // Liste des auteurs

  constructor(
    private formBuilder: FormBuilder, // Service pour construire le formulaire
    private router: Router, // Service pour la navigation
    private bookService: BookService, // Service pour les opérations sur les livres
    private authorService: AuthorService // Service pour les opérations sur les auteurs
  ) {
    // Initialise le formulaire avec des champs et des validateurs
    this.book = this.formBuilder.group({
      title: ['', [Validators.required]], // Champ titre, requis
      coverText: ['', [Validators.required]], // Champ texte de couverture, requis
      idAuthor: ['', [Validators.required]], // Champ ID de l'auteur, requis
      comment: ['', [Validators.required]], // Champ commentaire, requis
    });
  }

  ngOnInit(): void {
    // Récupère la liste des auteurs lors de l'initialisation du composant
    this.authorService.getAuthors().subscribe((data: Author[]) => {
      this.authors = data;
    });
  }

  private addBook() {
    // Ajoute un livre en utilisant le service bookService
    this.bookService.createBook(this.book.value).subscribe({
      next: () => {
        alert("Livre ajouté avec succès !"); // Affiche un message de succès
        this.book.reset(); // Réinitialise le formulaire
        this.submitted = false; // Réinitialise l'état de soumission
        this.router.navigate(['/books']); // Redirige vers la liste des livres
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du livre", error); // Affiche une erreur en cas d'échec
      }
    });
  }

  onSubmit() {
    this.submitted = true; // Marque le formulaire comme soumis
    if (this.book.invalid) {
      return false; // Si le formulaire est invalide, ne pas continuer
    } else {
      this.addBook(); // Sinon, ajoute le livre
      return true;
    }
  }

  get form() {
    return this.book.controls; // Getter pour accéder aux contrôles du formulaire
  }
}
