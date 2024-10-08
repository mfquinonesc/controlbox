import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  path: string = `${environment.path}/book`;

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get(this.path);
  }

  getBook(id:number): Observable<any>{
    return this.http.get(`${this.path}/${id}`);
  }
}
