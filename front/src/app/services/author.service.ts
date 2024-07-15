import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Author from '../models/author.model';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private httpClient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAuthors(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(`${this.apiUrl}/authors`, { headers: this.getHeaders() });
  }

  getAuthor(id: number): Observable<Author> {
    return this.httpClient.get<Author>(`${this.apiUrl}/authors/${id}`, { headers: this.getHeaders() });
  }

  createAuthor(author: Author): Observable<Author> {
    return this.httpClient.post<Author>(`${this.apiUrl}/authors`, author, { headers: this.getHeaders() });
  }

  updateAuthor(author: Author): Observable<Author> {
    return this.httpClient.put<Author>(`${this.apiUrl}/authors/${author.id}`, author, { headers: this.getHeaders() });
  }

  deleteAuthor(id: number): Observable<Author> {
    return this.httpClient.delete<Author>(`${this.apiUrl}/authors/${id}`, { headers: this.getHeaders() });
  }

  getAuthorsPaginated(page: number, limit: number): Observable<Author[]> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.httpClient.get<Author[]>(`${this.apiUrl}/authors`, { params, headers: this.getHeaders() });
  }
}
