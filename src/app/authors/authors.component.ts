import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AuthorsService} from "../books/service/authors.service";
import {Author} from "../books/model/book";

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="author-container">
      <h2>Find Author</h2>
      <form (ngSubmit)="onSubmit()">
        <label for="authorId">Author ID:</label>
        <input id="authorId" [(ngModel)]="authorId" name="authorId" type="text" />
        <button type="submit">Search</button>
      </form>
      <div *ngIf="authorInfo">
        <h3>Author Information</h3>
        <p>{{ authorInfo?.firstName }} - {{ authorInfo?.lastName }}</p>
      </div>
      <div *ngIf="authorInfo === null && submitted">
        <p>No author found with the provided ID.</p>
      </div>
    </div>
  `,
  styles: [/* Your styles */]
})
export class AuthorsComponent {
  authorId: string = '';
  authorInfo: Author | null = null;
  submitted = false;

  constructor(private authorsService: AuthorsService) {}

  onSubmit(): void {
    this.submitted = true;
    const id = parseInt(this.authorId, 10);

    this.authorsService.getAuthorById(id).subscribe(
      (response) => {
        this.authorInfo = response;
      },
      (error) => {
        if (error.message === 'Author not found' || error.status === 404) {
          this.authorInfo = null;
        } else {
          console.error('An error occurred:', error);
        }
      }
    );
  }
}
