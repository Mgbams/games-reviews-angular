import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGameComponent } from './add-game/add-game.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { GameDescriptionComponent } from './game-description/game-description.component';
import { HomeComponent } from './home/home.component';
import { ListAvisComponent } from './list-avis/list-avis.component';
import { ListJeuxComponent } from './list-jeux/list-jeux.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'game-lists', component: ListJeuxComponent},
    {path: 'review-lists', component: ListAvisComponent},
    {path: 'add-review', component: AddReviewComponent},
    {path: 'add-game', component: AddGameComponent},
    {path: '', redirectTo: '/home', pathMatch: "full"},
    {path: 'gameDescription/:idGame', component: GameDescriptionComponent},
    {path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
