import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { BooksComponent } from './views/books/books.component';
import { DetailsComponent } from './components/details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { NotauthorizedComponent } from './views/notauthorized/notauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SigninFormComponent,
    SignupFormComponent,
    BooksComponent,
    DetailsComponent,
    NotfoundComponent,
    NotauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
