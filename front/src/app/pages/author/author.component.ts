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
export class AuthorComponent implements OnInit {
  detail!: Author; // Propriété pour stocker les détails de l'auteur

  // Constructeur du composant, injecte Router, ActivatedRoute et AuthorService
  constructor(private router: Router,
              private route: ActivatedRoute,
              private authorService: AuthorService) {
  }

  // Méthode privée pour s'abonner aux détails de l'auteur
  private subscribeAuthor(id: number) {
    this.authorService.getAuthor(id).subscribe((response) => {
      this.detail = response; // Met à jour la propriété detail avec la réponse
    });
  }

  // Méthode privée pour vérifier et s'abonner à l'auteur en fonction de l'ID
  private setSubscribe(id: string | null) {
    if (id && !isNaN(+id)) {
      this.subscribeAuthor(+id); // Si l'ID est valide, s'abonner aux détails de l'auteur
    } else if (!id) {
      this.router.navigate(['not-found']); // Si l'ID est nul, rediriger vers la page "not-found"
    }
  }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Récupère l'ID de l'auteur depuis les paramètres de la route
    this.setSubscribe(id); // Appelle la méthode setSubscribe avec l'ID récupéré
  }
}
