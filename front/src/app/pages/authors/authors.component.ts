import { Component } from '@angular/core';
import { AuthorListComponent } from './author-list/author-list.component';
import Author from '../../models/author.model';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [AuthorListComponent],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {

  authors: Author[] = [];
  currentPage: number = 1;
  totalPages : number = 0;
  limit: number = 12;

  constructor(
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    this.authorService.getAuthorsPaginated(this.currentPage, this.limit).subscribe(data => {
      this.authors = data;
      this.totalPages = Math.ceil(data.length / this.limit);
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadAuthors();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadAuthors();
    }
  }

}
