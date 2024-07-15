import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, Input } from '@angular/core';
import Book from '../../../../models/book.model';
import { BookService } from '../../../../services/book.service';
import { CommonModule } from '@angular/common';
import User from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  bookId: number;
  @Input() book: Book | undefined;
  role: string | null = null;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private userService: UserService) {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.role = this.userService.getRole();
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
