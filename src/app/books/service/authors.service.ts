import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const Url = 'http://localhost:8080/';

export interface Author {
  id: number;
  name: string;
  bio: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private http: HttpClient = inject(HttpClient);

  public getAuthorBioById(id: number): Observable<Author> {
    return this.http.get<Author>(`${Url}authors/${id}/bio`);
  }

  public getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(`${Url}authors/${id}`).pipe(
      map(response => response ? response : undefined)
    );
  }

  public getAuthorsNamed(firstName: string, lastName: string): Observable<Author[]> {
    const options = { params: new HttpParams().set('firstName', firstName).set('lastName', lastName) };
    return this.http.get<any>(`${Url}authors`, options).pipe(
      map(response => response._embedded ? response._embedded.authors : [])
    );
  }
}
