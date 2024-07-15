import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Book from '../models/book.model';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private httpClient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.apiUrl}/books`, { headers: this.getHeaders() });
  }

  getBook(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`${this.apiUrl}/books/${id}`, { headers: this.getHeaders() });
  }

  createBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(`${this.apiUrl}/books`, book, { headers: this.getHeaders() });
  }

  updateBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.apiUrl}/books/${book.id}`, book, { headers: this.getHeaders() });
  }

  deleteBook(id: number): Observable<Book> {
    return this.httpClient.delete<Book>(`${this.apiUrl}/books/${id}`, { headers: this.getHeaders() });
  }

  getBooksPaginated(page: number, limit: number): Observable<Book[]> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.httpClient.get<Book[]>(`${this.apiUrl}/books`, { params, headers: this.getHeaders() });
  }
}
