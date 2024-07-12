import { SlicePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-author-card',
  standalone: true,
  imports: [RouterLink, SlicePipe],
  templateUrl: './author-card.component.html',
  styleUrl: './author-card.component.css'
})
export class AuthorCardComponent {

  @Input() author!: any;
}
