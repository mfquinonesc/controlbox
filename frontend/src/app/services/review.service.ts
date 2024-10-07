import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.development';
import { ReviewModel } from '../models/review-model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  path: string = `${environment.path}/review`;
  
  constructor(private http: HttpClient) { }
 
  getAllByBookId(id:number): Observable<any>{
    return this.http.get(`${this.path}/book/${id}`);
  }

  create(review:ReviewModel):Observable<any>{
    console.log('Create',review);    
    return this.http.post(`${this.path}`,review);
  }

  update(id:number,review:ReviewModel):Observable<any>{
    console.log('Update',review);    
    return this.http.put(`${this.path}/${id}`,review);
  }

  delete(id:number):Observable<any>{
    return this.http.delete(`${this.path}/${id}`);
  }

  get(id:number):Observable<any>{
    return this.http.get(`${this.path}/${id}`);
  }

}
