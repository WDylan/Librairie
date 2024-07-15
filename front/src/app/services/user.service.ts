import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import User from '../models/user.model';
import Login from '../models/login.model';

import { Router } from '@angular/router';

// Décorateur Injectable pour indiquer qu'il s'agit d'un service injectable
@Injectable({
  providedIn: 'root' // Le service est fourni à la racine de l'application
})
export class UserService {
  private tokenKey = 'token'; // Clé pour stocker le token dans le localStorage
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de base de l'API
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn()); // BehaviorSubject pour suivre l'état de connexion

  // Injection des services HttpClient et Router dans le constructeur
  constructor(private httpClient: HttpClient, private router: Router) { }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey); // Vérifie la présence du token dans le localStorage
  }

  // Getter pour obtenir un Observable de l'état de connexion
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable(); // Retourne l'Observable du BehaviorSubject
  }

  // Méthode pour se connecter
  login(credentials: Login): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(`${this.apiUrl}/login_check`, credentials).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token); // Stocke le token dans le localStorage
        this.loggedIn.next(true); // Met à jour l'état de connexion
      })
    );
  }

  // Méthode pour se déconnecter
  logout(): void {
    localStorage.removeItem(this.tokenKey); // Supprime le token du localStorage
    this.loggedIn.next(false); // Met à jour l'état de connexion
    this.router.navigate(['/login']); // Redirige vers la page de login
  }

  // Méthode pour obtenir la liste des utilisateurs
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`); // Effectue une requête GET pour obtenir les utilisateurs
  }

  // Méthode pour obtenir un utilisateur par son ID
  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/users/${id}`); // Effectue une requête GET pour obtenir un utilisateur spécifique
  }

  // Méthode pour créer un nouvel utilisateur
  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/users`, user); // Effectue une requête POST pour créer un utilisateur
  }

  // Méthode pour mettre à jour un utilisateur
  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/users/${user.id}`, user); // Effectue une requête PUT pour mettre à jour un utilisateur
  }

  // Méthode pour supprimer un utilisateur
  deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.apiUrl}/users/${id}`); // Effectue une requête DELETE pour supprimer un utilisateur
  }

  // Nouvelle méthode pour obtenir le rôle de l'utilisateur
  getRole(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.roles ? payload.roles[0] : null; // Retourne le premier rôle trouvé
      } catch (e) {
        console.error('Invalid token format', e);
        return null;
      }
    }
    return null;
  }
}
