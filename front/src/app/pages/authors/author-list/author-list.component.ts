import { RouterLink } from '@angular/router';
import { Component, Input } from '@angular/core';
import { AuthorCardComponent } from '../author-card/author-card.component';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [RouterLink, AuthorCardComponent, CommonModule],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css'
})
export class AuthorListComponent {

  @Input() authors: any[] = [];

  role: string | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.role = this.userService.getRole();
  }
}
