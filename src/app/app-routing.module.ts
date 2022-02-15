import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDescriptionComponent } from './game-description/game-description.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "gameDescription/:idGame", component: GameDescriptionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
