import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { manageActivitiesComponent } from './manageActivities/manageActivities.component';
import { FiltroActividadesPipe } from './manageActivities/manageActivities.component';
import { ActividadComponent } from './activities/activities.component';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    

  ],
  declarations: [
    AppComponent,
    UsersComponent,
    ActividadComponent,
    manageActivitiesComponent,
    FiltroActividadesPipe,
  ],
  providers: [
    // no need to place any providers due to the `providedIn` flag...
  
    provideAnimationsAsync()
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }