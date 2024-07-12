import { Component, Input } from '@angular/core';
import Author from '../../../models/author.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../../../services/author.service';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent {
  authorId: number;
  @Input() author: Author | undefined;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authorService: AuthorService) {
    this.authorId = +this.route.snapshot.paramMap.get('id')!;
  }

  confirmDelete(): void {
    if (confirm('Êtes vous sûr de vouloir supprimer l\'auteur ??')) {
      this.deleteAuthor();
    }
  }

  deleteAuthor(): void {
    if (this.author) {
      this.authorService.deleteAuthor(this.author.id).subscribe(() => {
        this.router.navigate(['/authors']);
      });
    }
  }
}
