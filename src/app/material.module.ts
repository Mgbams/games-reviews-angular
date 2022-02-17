import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';


const MaterialComponents = [
  MatButtonToggleModule,
  MatGridListModule,
  MatCardModule,
  MatButtonModule,
  MatPaginatorModule,
  MatDividerModule,
  MatIconModule,
  MatToolbarModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatTableModule,
  MatSortModule,
  MatSelectModule,
];

@NgModule({
  declarations: [],
 imports: [
    MaterialComponents
  ],
  exports: [MaterialComponents],
})
export class MaterialModule { }
