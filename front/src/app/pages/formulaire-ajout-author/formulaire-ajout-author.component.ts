import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-formulaire-ajout-author',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulaire-ajout-author.component.html',
  styleUrl: './formulaire-ajout-author.component.css'
})
export class FormulaireAjoutAuthorComponent {
  author: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authorService: AuthorService) {
    this.author = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }

  private addAuthor() {
    this.authorService.createAuthor(this.author.value).subscribe({
      next: () => {
        alert("Auteur ajouté avec succès !");
        this.author.reset();
        this.submitted = false;
        this.router.navigate(['/authors']);
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout de l'auteur", error);
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.author.invalid) {
      return false;
    } else {
      this.addAuthor();
      return true;
    }
  }

  get form() {
    return this.author.controls;
  }
}
