import { UserService } from './../../../services/user.service';
import { CommonModule, SlicePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterLink, SlicePipe, CommonModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {

  @Input() book!: any;

  role: string | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.role = this.userService.getRole();
  }
}
