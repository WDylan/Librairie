import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Book from '../models/book.model';

// Décorateur Injectable pour indiquer qu'il s'agit d'un service injectable
@Injectable({
  providedIn: 'root' // Le service est fourni à la racine de l'application
})
export class BookService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de base de l'API

  // Injection du service HttpClient dans le constructeur
  constructor(private httpClient: HttpClient) { }

  // Méthode privée pour obtenir les en-têtes HTTP avec le token d'authentification
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Récupère le token du localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Ajoute le token dans les en-têtes
    });
  }

  // Méthode pour obtenir la liste des livres
  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.apiUrl}/books`, { headers: this.getHeaders() });
  }

  // Méthode pour obtenir un livre par son ID
  getBook(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`${this.apiUrl}/books/${id}`, { headers: this.getHeaders() });
  }

  // Méthode pour créer un nouveau livre
  createBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(`${this.apiUrl}/books`, book, { headers: this.getHeaders() });
  }

  // Méthode pour mettre à jour un livre
  updateBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.apiUrl}/books/${book.id}`, book, { headers: this.getHeaders() });
  }

  // Méthode pour supprimer un livre
  deleteBook(id: number): Observable<Book> {
    return this.httpClient.delete<Book>(`${this.apiUrl}/books/${id}`, { headers: this.getHeaders() });
  }

  // Méthode pour obtenir une liste paginée de livres
  getBooksPaginated(page: number, limit: number): Observable<Book[]> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString()); // Définit les paramètres de pagination
    return this.httpClient.get<Book[]>(`${this.apiUrl}/books`, { params, headers: this.getHeaders() });
  }
}
