import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BookModel } from 'src/app/models/book-model';
import { Option } from 'src/app/models/option';
import { ReviewModel } from 'src/app/models/review-model';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() isVisible: boolean = true;
  @Input() book = new BookModel();
  @Input() option: Option = { detail: false, edit: false, list: false };
  @Output() closeEvent = new EventEmitter<boolean>();

  review: ReviewModel = new ReviewModel();

  formReview = this.formBuilder.group({
    rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    comment: ['', [Validators.required]]
  });

  constructor(private authService: AuthService, private reviewService: ReviewService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.initialize();
  }

  get rating() {
    return this.formReview.controls.rating;
  }

  get comment() {
    return this.formReview.controls.comment;
  }

  get ratingValue() {
    return this.formReview.value.rating;
  }

  get commentValue() {
    return this.formReview.value.comment;
  }

  close() {
    this.isVisible = false;
    this.closeEvent.emit(this.isVisible);
  }

  save() {
    if (this.formReview.valid) {

      const user = this.authService.getSession();
      this.review.userId = user.id as unknown as number;
      this.review.bookId = this.book.id;
      this.review.rating = this.ratingValue!;
      this.review.comment = this.commentValue!;

      if (this.review.id) {
        this.reviewService.update(this.review.id!, this.review).subscribe({
          next: (value) => {
            this.close();
          },
        });
      }
      else {
        this.reviewService.create(this.review).subscribe({
          next: (value) => {
            this.close();
          },
        });
      }
    }else{
      alert('Debe llenar todos los campos');
    }
  }

  delete() {
    if (this.review.id) {
      this.reviewService.delete(this.review.id).subscribe({
        next: (value) => {
          this.close();
        },
      });
    }
  }

  initialize() { 
    if (this.book.reviews && this.book.reviews.length > 0) {      
      const user = this.authService.getSession();
      this.review = this.book.reviews.find(r => r.userId == user.id) || { rating: 0, comment: '' } as ReviewModel;
      if (this.review) {
        this.formReview.setValue({
          rating: this.review.rating!,
          comment: this.review.comment!
        })
      }   
    }
  }
}
