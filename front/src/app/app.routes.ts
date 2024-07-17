import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './commons/not-found/not-found.component';
import { BooksComponent } from './pages/books/books.component';
import { BookComponent } from './pages/book/book/book.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { AuthorComponent } from './pages/author/author.component';
import { FormulaireAjoutBookComponent } from './pages/formulaire-ajout-book/formulaire-ajout-book.component';
import { FormulaireModifBookComponent } from './pages/formulaire-modif-book/formulaire-modif-book.component';
import { FormulaireAjoutAuthorComponent } from './pages/formulaire-ajout-author/formulaire-ajout-author.component';
import { FormulaireModifAuthorComponent } from './pages/formulaire-modif-author/formulaire-modif-author.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'register', component: RegisterComponent },

  { path: 'login', component: LoginComponent },

  { path: 'logout', component: LoginComponent },

  { path: 'home', component: HomeComponent },

  { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },

  { path: 'books/:id', component: BookComponent, canActivate: [AuthGuard] },

  { path: 'books/:id/edit', component: FormulaireModifBookComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_ADMIN' } },

  { path: 'newBook', component: FormulaireAjoutBookComponent, canActivate: [AuthGuard], data: { expectedRole: "ROLE_ADMIN" } },

  { path: 'authors', component: AuthorsComponent, canActivate: [AuthGuard] },

  { path: 'authors/:id', component: AuthorComponent, canActivate: [AuthGuard] },

  { path: 'authors/:id/edit', component: FormulaireModifAuthorComponent, canActivate: [AuthGuard], data: { expectedRole: "ROLE_ADMIN" } },

  { path: 'newAuthor', component: FormulaireAjoutAuthorComponent, canActivate: [AuthGuard], data: { expectedRole: "ROLE_ADMIN" } },

  { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
