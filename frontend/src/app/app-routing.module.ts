import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { BooksComponent } from './views/books/books.component';
import { adminGuard } from './guard/admin.guard';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { NotauthorizedComponent } from './views/notauthorized/notauthorized.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'books', component: BooksComponent, canActivate: [adminGuard] },
  { path: '**', component: NotfoundComponent },
  { path: 'unauthorized', component: NotauthorizedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
