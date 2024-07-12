import { Component, Input } from '@angular/core';
import { BookCardComponent } from '../book-card/book-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {

  @Input() books: any[] = [];
}
