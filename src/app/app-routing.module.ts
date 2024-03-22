import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { manageActivitiesComponent } from './manageActivities/manageActivities.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'manageActivities', component: manageActivitiesComponent }
];

@NgModule({
  imports: [RouterModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }