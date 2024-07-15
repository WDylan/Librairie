import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from '../models/user.model';
import Login from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.apiUrl}/users/${id}`);
  }

  login(credentials: Login): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(`${this.apiUrl}/login_check`, credentials);
  }

}
