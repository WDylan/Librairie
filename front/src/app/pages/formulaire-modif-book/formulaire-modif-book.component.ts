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
  book: FormGroup;
  submitted: boolean = false;
  bookId?: number;
  authors: Author[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private authorService: AuthorService
  ) {
    this.book = this.formBuilder.group({
      title: ['', Validators.required],
      coverText: ['', Validators.required],
      idAuthor: ['', Validators.required],
      comment: ['']
    });
  }

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.bookId) {
      this.bookService.getBook(this.bookId).subscribe((data: Book) => {
        const bookData = { ...data, idAuthor: data.author.id };
        this.book.patchValue(bookData);
      });
    }

    this.authorService.getAuthors().subscribe((data: Author[]) => {
      this.authors = data;
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.book.invalid) {
      return;
    }

    if (this.bookId) {
      const updatedBook = { ...this.book.value, id: this.bookId };
      this.bookService.updateBook(updatedBook).subscribe({
        next: () => {
          alert('Livre mis à jour avec succès !');
          this.router.navigate(['/books']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du livre', error);
        }
      });
    }
  }

  get form() {
    return this.book.controls;
  }
}
