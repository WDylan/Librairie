import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import Author from '../../models/author.model';

@Component({
  selector: 'app-formulaire-modif-author',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './formulaire-modif-author.component.html',
  styleUrl: './formulaire-modif-author.component.css'
})
export class FormulaireModifAuthorComponent {
  author: FormGroup; // Déclare un formulaire réactif pour l'auteur
  submitted: boolean = false; // Indique si le formulaire a été soumis
  authorId?: number; // ID de l'auteur à modifier

  constructor(
    private formBuilder: FormBuilder, // Service pour construire le formulaire
    private route: ActivatedRoute, // Service pour accéder aux informations de la route active
    private router: Router, // Service pour la navigation
    private authorService: AuthorService // Service pour les opérations sur les auteurs
  ) {
    // Initialise le formulaire avec des champs et des validateurs
    this.author = this.formBuilder.group({
      firstName: ['', Validators.required], // Champ prénom, requis
      lastName: ['', Validators.required] // Champ nom de famille, requis
    });
  }

  ngOnInit(): void {
    // Récupère l'ID de l'auteur à partir des paramètres de la route
    this.authorId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.authorId) {
      // Si l'ID de l'auteur est valide, récupère les données de l'auteur
      this.authorService.getAuthor(this.authorId).subscribe((data: Author) => {
        this.author.patchValue(data); // Met à jour le formulaire avec les données de l'auteur
      });
    }
  }

  onSubmit(): void {
    this.submitted = true; // Marque le formulaire comme soumis
    if (this.author.invalid) {
      return; // Si le formulaire est invalide, ne pas continuer
    }
    if (this.authorId) {
      // Si l'ID de l'auteur est valide, met à jour l'auteur
      const updatedAuthor = { ...this.author.value, id: this.authorId };
      this.authorService.updateAuthor(updatedAuthor).subscribe({
        next: () => {
          alert('Auteur mis à jour avec succès !'); // Affiche un message de succès
          this.router.navigate(['/authors']); // Redirige vers la liste des auteurs
        },
        error: (error) => {
          console.log('Erreur lors de la mise à jour de l\'auteur', error); // Affiche une erreur en cas d'échec
        }
      });
    }
  }

  get form() {
    return this.author.controls; // Getter pour accéder aux contrôles du formulaire
  }
}
