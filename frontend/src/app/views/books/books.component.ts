import { Component } from '@angular/core';
import { BookModel } from 'src/app/models/book-model';
import { Option } from 'src/app/models/option';
import { ReviewModel } from 'src/app/models/review-model';
import { BookService } from 'src/app/services/book.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {

  option: Option = { detail: false, edit: false, list: false };
  books: BookModel[] = [];
  book = new BookModel();
  reviews: ReviewModel[] = [];
  filter: string = 'category';
  text: string = '';
  fBooks: BookModel[] = [];

  constructor(private bookService: BookService, private reviewService: ReviewService) {
    this.getBooks();
  }

  showEdit(value: BookModel) {
    this.book = value;
    if (this.book.id) {
      this.reviewService.getAllByBookId(this.book.id).subscribe({
        next: (value) => {
          this.book.reviews = value as ReviewModel[];
        },
        complete: () => {
          this.option = { detail: false, edit: true, list: false };
        },
      });
    }

  }

  showList(value: BookModel) {
    this.book = value;
    if (this.book.id) {
      this.reviewService.getAllByBookId(this.book.id).subscribe({
        next: (value) => {
          this.book.reviews = value as ReviewModel[];
        },
        complete: () => {
          this.option = { detail: false, edit: false, list: true };
        }
      });
    }
  }

  showDetail(value: BookModel) {
    this.book = value;
    if (this.book.id) {
      this.reviewService.getAllByBookId(this.book.id).subscribe({
        next: (value) => {
          this.book.reviews = value as ReviewModel[];
        },
        complete: () => {
          this.option = { detail: true, edit: false, list: false };
        }
      });
    }
  }

  reset() {
    this.option = { detail: false, edit: false, list: false };
    this.getBooks();   
  }

  getBooks() {
    this.bookService.getBooks().subscribe({
      next: (value) => {
        this.books = value as BookModel[];
        this.fBooks = this.books;
        this.search();
      },
    });
  }

  format(value: string): string {
    const accentsMap: { [key: string]: string } = {
      'á': 'a',
      'é': 'e',
      'í': 'i',
      'ó': 'o',
      'ú': 'u',
      'Á': 'A',
      'É': 'E',
      'Í': 'I',
      'Ó': 'O',
      'Ú': 'U',
      'ñ': 'n',
      'Ñ': 'N'
    };

    return value.split('').map(char => accentsMap[char] || char).join('').toLowerCase();
  }


  search() {   
    if (this.text) {
      if (this.filter == 'category') {
        this.fBooks = this.books.filter(b => this.format(b.category!).includes(this.text.toLowerCase())|| b.category?.includes(this.text.toLowerCase()));
      } else if (this.filter == 'title') {
        this.fBooks = this.books.filter(b => this.format(b.title!).includes(this.text.toLowerCase())|| b.title?.includes(this.text.toLowerCase()));
      } else if (this.filter == 'author') {
        this.fBooks = this.books.filter(b => this.format(b.author!).includes(this.text.toLowerCase())|| b.author?.includes(this.text.toLowerCase()));
      }
    }
    else {
      this.text = '';
      this.fBooks = this.books;
    }
  }
}
