import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Author from '../models/author.model';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private httpClient: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(`${this.apiUrl}/authors`);
  }

  getAuthor(id: number): Observable<Author> {
    return this.httpClient.get<Author>(`${this.apiUrl}/authors/${id}`);
  }

  createAuthor(author: Author): Observable<Author> {
    return this.httpClient.post<Author>(`${this.apiUrl}/authors`, author);
  }

  updateAuthor(author: Author): Observable<Author> {
    return this.httpClient.put<Author>(`${this.apiUrl}/authors/${author.id}`, author);
  }

  deleteAuthor(id: number): Observable<Author> {
    return this.httpClient.delete<Author>(`${this.apiUrl}/authors/${id}`);
  }

  getAuthorsPaginated(page: number, limit: number): Observable<Author[]> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.httpClient.get<Author[]>(`${this.apiUrl}/authors`, { params });
  }
}
