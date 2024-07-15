import { Component, Input } from '@angular/core';
import Author from '../../../models/author.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthorService } from '../../../services/author.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent {
  authorId: number;
  @Input() author: Author | undefined;

  role: string | null = null;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private userService: UserService) {
    this.authorId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.role = this.userService.getRole();
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
