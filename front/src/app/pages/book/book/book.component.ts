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
export class BookComponent implements OnInit{
  detail!: Book;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService) {
  }

  private subscribeBook(id: number) {
    this.bookService.getBook(id).subscribe((response) => {
      this.detail = response;
    });
  }

  private setSubscribe(id: string | null) {
    if (id && !isNaN(+id)) {
      this.subscribeBook(+id);
    } else if (!id) {
      this.router.navigate(['not-found']);
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.setSubscribe(id);
  }
}
