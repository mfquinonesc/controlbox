import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user-model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path: string = `${environment.path}/auth`;

  private _islogin = new BehaviorSubject<boolean>(false);
  private _isSignIn = new BehaviorSubject<boolean>(true);
  private _currentUser = new BehaviorSubject<UserModel>(new UserModel());

  constructor(private http: HttpClient) { }

  login(user: UserModel): Observable<any> {
    return this.http.post(`${this.path}/login`, user);
  }

  signUp(user: UserModel): Observable<any> {
    return this.http.post(`${this.path}/signup`, user);
  }

  setIsLogin(value: boolean) {
    this._islogin.next(value);
  }

  getIsLogin(): Observable<boolean> {
    return this._islogin.asObservable();
  }

  setIsSignIn(value: boolean) {
    this._isSignIn.next(value);
  }

  getIsSignIn(): Observable<boolean> {
    return this._isSignIn.asObservable();
  }

  setCurrentUser(value: UserModel) {
    this._currentUser.next(value);
  }

  getCurrentUser(): Observable<any> {
    return this._currentUser.asObservable();
  }

  setToken(value: string) {
    localStorage.setItem('token', value);
  }

  setSession(value: UserModel) {
    sessionStorage.setItem('session', JSON.stringify(value));
  }

  getSession(): UserModel {
    return sessionStorage.getItem('session') ? JSON.parse(sessionStorage.getItem('session')!) as UserModel : new UserModel();
  }

  logOut() {
    sessionStorage.clear();
    localStorage.clear();
  }

  isAuthenticated() {
    return this.getIsLogin();
  }
}
