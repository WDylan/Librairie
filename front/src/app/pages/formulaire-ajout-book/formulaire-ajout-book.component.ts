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
  book: FormGroup;
  submitted: boolean = false;
  authors: Author[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private bookService: BookService,
    private authorService: AuthorService
  ) {
    this.book = this.formBuilder.group({
      title: ['', [Validators.required]],
      coverText: ['', [Validators.required]],
      idAuthor: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe((data: Author[]) => {
      this.authors = data;
    });
  }

  private addBook() {
    this.bookService.createBook(this.book.value).subscribe({
      next: () => {
        alert("Livre ajouté avec succès !");
        this.book.reset();
        this.submitted = false;
        this.router.navigate(['/books']);
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du livre", error);
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.book.invalid) {
      return false;
    } else {
      this.addBook();
      return true;
    }
  }

  get form() {
    return this.book.controls;
  }
}
