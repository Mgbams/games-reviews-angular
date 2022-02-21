import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { ModeratorReviewsComponent } from "./pages/moderator-reviews/moderator-reviews.component";
import { AuthGuardGuard } from './auth-guard.guard';
import { HomeComponent } from './home/home.component';
import { ListJeuxComponent } from './list-jeux/list-jeux.component';
import { AddGameComponent } from './add-game/add-game.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { GameDescriptionComponent } from './game-description/game-description.component';
import { ListAvisComponent } from './list-avis/list-avis.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaginatorComponent } from './paginator/paginator.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'game-lists', component: ListJeuxComponent, canActivate:[AuthGuardGuard]},
    {path: 'edit-game/:id', component: AddGameComponent, canActivate:[AuthGuardGuard]},
    {path: 'review-lists', component: ListAvisComponent, canActivate:[AuthGuardGuard]},
    {path: 'add-review/:id', component: AddReviewComponent, canActivate:[AuthGuardGuard]},
    {path: 'add-game', component: AddGameComponent, canActivate:[AuthGuardGuard]},
    {path: 'uploadImage/:id', component: UploadImageComponent, canActivate:[AuthGuardGuard]},
    {path: 'reviews/moderate', component: ModeratorReviewsComponent, canActivate:[AuthGuardGuard]},
    {path: 'gameDescription/:idGame', component: GameDescriptionComponent},
    {path: 'paginator', component: PaginatorComponent},
    {path: '', redirectTo: '/home', pathMatch: "full"},
    {path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
