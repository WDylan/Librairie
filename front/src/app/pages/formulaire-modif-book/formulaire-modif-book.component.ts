import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import Book from '../../models/book.model';

@Component({
  selector: 'app-formulaire-modif-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulaire-modif-book.component.html',
  styleUrl: './formulaire-modif-book.component.css'
})
export class FormulaireModifBookComponent {
  book: FormGroup;
  submitted: boolean = false;
  bookId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
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
