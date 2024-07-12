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

  books: Book[] = [];
  currentPage: number = 1;
  totalPages !: number;
  limit: number = 12;


  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooksPaginated(this.currentPage, this.limit).subscribe(data => {
      this.books = data;
      this.totalPages = Math.ceil(data.length / this.limit);
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadBooks();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadBooks();
    }
  }


}
