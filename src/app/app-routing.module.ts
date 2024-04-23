import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { manageActivitiesComponent } from './manageActivities/manageActivities.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { TemplatePreviewComponent } from './template-preview/template-preview.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'manageActivities', component: manageActivitiesComponent, canActivate: [AuthGuard] },
  { path: 'template-preview', component: TemplatePreviewComponent, canActivate: [AuthGuard] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }