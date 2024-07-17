import { Component, Input } from '@angular/core';
import Author from '../../../models/author.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthorService } from '../../../services/author.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent {
  authorId: number; // Propriété pour stocker l'ID de l'auteur
  @Input() author: Author | undefined; // Propriété d'entrée pour recevoir les détails de l'auteur

  role: string | null = null; // Propriété pour stocker le rôle de l'utilisateur

  // Constructeur du composant, injecte Router, ActivatedRoute, AuthorService et UserService
  constructor(private router: Router,
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private userService: UserService) {
    // Récupère l'ID de l'auteur depuis les paramètres de la route et le convertit en nombre
    this.authorId = +this.route.snapshot.paramMap.get('id')!;
  }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Récupère le rôle de l'utilisateur depuis le UserService
    this.role = this.userService.getRole();
  }

  // Méthode pour confirmer la suppression de l'auteur
  confirmDelete(): void {
    // Affiche une boîte de dialogue de confirmation
    if (confirm('Êtes vous sûr de vouloir supprimer l\'auteur ??')) {
      // Si l'utilisateur confirme, appelle la méthode deleteAuthor
      this.deleteAuthor();
    }
  }

  // Méthode pour supprimer l'auteur
  deleteAuthor(): void {
    // Vérifie si l'auteur est défini
    if (this.author) {
      // Appelle le service pour supprimer l'auteur et s'abonne à la réponse
      this.authorService.deleteAuthor(this.author.id).subscribe(() => {
        // Redirige vers la liste des auteurs après la suppression
        this.router.navigate(['/authors']);
      });
    }
  }
}
