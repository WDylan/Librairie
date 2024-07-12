import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Book from '../models/book.model';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private httpClient: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.apiUrl}/books`);
  }

  getBook(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`${this.apiUrl}/books/${id}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(`${this.apiUrl}/books`, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.apiUrl}/books/${book.id}`, book);
  }

  deleteBook(id: number): Observable<Book> {
    return this.httpClient.delete<Book>(`${this.apiUrl}/books/${id}`);
  }

  getBooksPaginated(page: number, limit: number): Observable<Book[]> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.httpClient.get<Book[]>(`${this.apiUrl}/books`, { params });
  }
}
