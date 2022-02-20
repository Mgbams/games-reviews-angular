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
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { NotificationComponent } from './notification/notification.component';
import { GameDescriptionComponent } from './game-description/game-description.component';
import { HttpClientModule } from '@angular/common/http';
import { ListAvisComponent } from './list-avis/list-avis.component';
import { ListJeuxComponent } from './list-jeux/list-jeux.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddGameComponent } from './add-game/add-game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaginatorComponent } from './paginator/paginator.component';
import { DatePipe } from '@angular/common';
import { ExcelService } from './services/excel.service';
import { UploadImageComponent } from './upload-image/upload-image.component';


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
    AddGameComponent,
    PaginatorComponent,
    UploadImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [DatePipe, ExcelService],
  bootstrap: [AppComponent],
  entryComponents: [SignupComponent, MatConfirmDialogComponent, UploadImageComponent]
})
export class AppModule { }
