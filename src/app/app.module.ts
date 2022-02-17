import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { NotificationComponent } from './notification/notification.component';
import { GameDescriptionComponent } from './game-description/game-description.component';
import { HttpClientModule } from '@angular/common/http';
import { ListAvisComponent } from './list-avis/list-avis.component';
import { ListJeuxComponent } from './list-jeux/list-jeux.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    MatConfirmDialogComponent,
    NotificationComponent,
    GameDescriptionComponent,
    ListAvisComponent,
    ListJeuxComponent,
    AddReviewComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SignupComponent, MatConfirmDialogComponent]
})
export class AppModule { }
