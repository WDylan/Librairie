import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Author from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  // URL de base de l'API
  private apiUrl = 'http://127.0.0.1:8000/api';

  // Injection du service HttpClient
  constructor(private httpClient: HttpClient) { }

  // Méthode pour obtenir les en-têtes HTTP avec le token d'authentification
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Récupérer la liste des auteurs
  getAuthors(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(`${this.apiUrl}/authors`, { headers: this.getHeaders() });
  }

  // Récupérer un auteur par son ID
  getAuthor(id: number): Observable<Author> {
    return this.httpClient.get<Author>(`${this.apiUrl}/authors/${id}`, { headers: this.getHeaders() });
  }

  // Créer un nouvel auteur
  createAuthor(author: Author): Observable<Author> {
    return this.httpClient.post<Author>(`${this.apiUrl}/authors`, author, { headers: this.getHeaders() });
  }

  // Mettre à jour un auteur existant
  updateAuthor(author: Author): Observable<Author> {
    return this.httpClient.put<Author>(`${this.apiUrl}/authors/${author.id}`, author, { headers: this.getHeaders() });
  }

  // Supprimer un auteur par son ID
  deleteAuthor(id: number): Observable<Author> {
    return this.httpClient.delete<Author>(`${this.apiUrl}/authors/${id}`, { headers: this.getHeaders() });
  }

  // Récupérer une liste paginée d'auteurs
  getAuthorsPaginated(page: number, limit: number): Observable<Author[]> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.httpClient.get<Author[]>(`${this.apiUrl}/authors`, { params, headers: this.getHeaders() });
  }
}
