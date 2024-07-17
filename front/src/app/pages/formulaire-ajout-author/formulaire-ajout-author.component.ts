import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-formulaire-ajout-author',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './formulaire-ajout-author.component.html',
  styleUrl: './formulaire-ajout-author.component.css'
})
export class FormulaireAjoutAuthorComponent {
  author: FormGroup; // Déclaration du formulaire de type FormGroup
  submitted: boolean = false; // Indicateur de soumission du formulaire

  // Constructeur avec injection des services nécessaires
  constructor(private formBuilder: FormBuilder, private router: Router, private authorService: AuthorService) {
    // Initialisation du formulaire avec des champs et des validateurs
    this.author = this.formBuilder.group({
      firstName: ['', [Validators.required]], // Champ prénom avec validation requise
      lastName: ['', [Validators.required]] // Champ nom avec validation requise
    });
  }

  // Méthode privée pour ajouter un auteur
  private addAuthor() {
    // Appel du service pour créer un auteur avec les valeurs du formulaire
    this.authorService.createAuthor(this.author.value).subscribe({
      next: () => {
        // En cas de succès, afficher une alerte, réinitialiser le formulaire et rediriger
        alert("Auteur ajouté avec succès !");
        this.author.reset();
        this.submitted = false;
        this.router.navigate(['/authors']);
      },
      error: (error) => {
        // En cas d'erreur, afficher un message d'erreur dans la console
        console.error("Erreur lors de l'ajout de l'auteur", error);
      }
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    this.submitted = true; // Indique que le formulaire a été soumis
    if (this.author.invalid) {
      // Si le formulaire est invalide, ne pas continuer
      return false;
    } else {
      // Si le formulaire est valide, appeler la méthode pour ajouter un auteur
      this.addAuthor();
      return true;
    }
  }

  // Getter pour accéder facilement aux contrôles du formulaire dans le template
  get form() {
    return this.author.controls;
  }
}
