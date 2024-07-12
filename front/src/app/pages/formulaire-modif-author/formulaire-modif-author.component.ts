import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import Author from '../../models/author.model';

@Component({
  selector: 'app-formulaire-modif-author',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulaire-modif-author.component.html',
  styleUrl: './formulaire-modif-author.component.css'
})
export class FormulaireModifAuthorComponent {
  author: FormGroup;
  submitted: boolean = false;
  authorId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authorService: AuthorService
  ) {
    this.author = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authorId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.authorId) {
      this.authorService.getAuthor(this.authorId).subscribe((data: Author) => {
        this.author.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.author.invalid) {
      return;
    }
    if (this.authorId) {
      const updatedAuthor = { ...this.author.value, id: this.authorId };
      this.authorService.updateAuthor(updatedAuthor).subscribe({
        next: () => {
          alert('Auteur mis à jour avec succès !');
          this.router.navigate(['/authors']);
        },
        error: (error) => {
          console.log('Erreur lors de la mise à jour de l\'auteur', error);
        }
      });
    }
  }

  get form() {
    return this.author.controls;
  }
}
