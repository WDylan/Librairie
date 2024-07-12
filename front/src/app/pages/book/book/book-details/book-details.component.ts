import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import Book from '../../../../models/book.model';
import { BookService } from '../../../../services/book.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  bookId: number;
  @Input() book: Book | undefined;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService) {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
  }

  confirmDelete(): void {
    if (confirm('Êtes vous sûr de vouloir supprimer le livre ??')) {
      this.deleteBook();
    }

  }

  deleteBook(): void {
    if (this.book) {
      this.bookService.deleteBook(this.book.id).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }
}
