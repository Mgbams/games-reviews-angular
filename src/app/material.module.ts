import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';


const MaterialComponents = [
  MatButtonToggleModule,
  MatGridListModule,
  MatCardModule,
  MatButtonModule,
  MatPaginatorModule,
  MatDividerModule,
  MatIconModule,
  MatToolbarModule,
];



@NgModule({
  declarations: [],
 imports: [
    MaterialComponents
  ],
  exports: [MaterialComponents],
})
export class MaterialModule { }
