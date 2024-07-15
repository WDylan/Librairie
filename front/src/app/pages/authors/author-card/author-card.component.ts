import { CommonModule, SlicePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-author-card',
  standalone: true,
  imports: [RouterLink, SlicePipe, CommonModule],
  templateUrl: './author-card.component.html',
  styleUrl: './author-card.component.css'
})
export class AuthorCardComponent {

  @Input() author!: any;

  role: string | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.role = this.userService.getRole();
  }
}
