import { Component, OnInit } from '@angular/core';
import { AuthorDetailsComponent } from "./author-details/author-details.component";
import Author from '../../models/author.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [AuthorDetailsComponent],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit{
  detail!: Author;

   constructor(private router: Router,
    private route: ActivatedRoute,
    private authorService: AuthorService) {
  }

  private subscribeAuthor(id: number) {
    this.authorService.getAuthor(id).subscribe((response) => {
      this.detail = response;
    });
  }

  private setSubscribe(id: string | null) {
    if (id && !isNaN(+id)) {
      this.subscribeAuthor(+id);
    } else if (!id) {
      this.router.navigate(['not-found']);
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.setSubscribe(id);
  }
}
