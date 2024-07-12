import { Routes } from '@angular/router';
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

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  { path: 'books', component: BooksComponent },

  { path: 'books/:id', component: BookComponent },

  { path: 'books/:id/edit', component: FormulaireModifBookComponent},

  { path: 'newBook', component: FormulaireAjoutBookComponent },

  { path: 'authors', component: AuthorsComponent },

  { path: 'authors/:id', component: AuthorComponent },

  { path: 'authors/:id/edit', component: FormulaireModifAuthorComponent},

  { path: 'newAuthor', component: FormulaireAjoutAuthorComponent },

  { path: '**', component: NotFoundComponent },
];
