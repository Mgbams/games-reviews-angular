import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGameComponent } from './add-game/add-game.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { GameDescriptionComponent } from './game-description/game-description.component';
import { HomeComponent } from './home/home.component';
import { ListAvisComponent } from './list-avis/list-avis.component';
import { ListJeuxComponent } from './list-jeux/list-jeux.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ModeratorReviewsComponent } from "./pages/moderator-reviews/moderator-reviews.component";
import { AuthGuardGuard } from './auth-guard.guard';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'game-lists', component: ListJeuxComponent},
    {path: 'edit-game/:id', component: AddGameComponent, canActivate:[AuthGuardGuard]},
    {path: 'review-lists', component: ListAvisComponent, canActivate:[AuthGuardGuard]},
    {path: 'add-review', component: AddReviewComponent, canActivate:[AuthGuardGuard]},
    {path: 'add-game', component: AddGameComponent, canActivate:[AuthGuardGuard]},
    {path: 'gameDescription/:idGame', component: GameDescriptionComponent},
    {path: 'paginator', component: PaginatorComponent},
    {path: 'reviews/moderate', component: ModeratorReviewsComponent},
    {path: '**', pathMatch: 'full', component: PageNotFoundComponent }
    {path: 'uploadImage/:id', component: UploadImageComponent},
    {path: '', redirectTo: '/home', pathMatch: "full"},
    {path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
