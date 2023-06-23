import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PostInfoComponent } from './post-info/post-info.component';
import { PostAddComponent } from './post-add/post-add.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'rooms',
    component: RoomsComponent,
  },
  {
    path: 'post/add',
    component: PostAddComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'posts/:id',
    component: PostInfoComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
