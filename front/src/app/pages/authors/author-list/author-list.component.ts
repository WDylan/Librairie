import { RouterLink } from '@angular/router';
import { Component, Input } from '@angular/core';
import { AuthorCardComponent } from '../author-card/author-card.component';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [RouterLink, AuthorCardComponent],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css'
})
export class AuthorListComponent {

  @Input() authors: any[] = [];
}
