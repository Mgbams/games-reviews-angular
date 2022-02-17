import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Game } from '../model/game.model';


/*const ELEMENT_DATA: Game[] = [
  {id: 1, picture: '1.jpg', name: 'Hydrogen', publisher: 'Arthur', genre: 'yello' },
  {id: 2, picture: '1.jpg', name: 'Hydrogen', publisher: 'Arthur', genre: 'yello' },
  {id: 3, picture: '1.jpg', name: 'Hydrogen', publisher: 'Arthur', genre: 'yello' },
  {id: 4, picture: '1.jpg', name: 'Hydrogen', publisher: 'Arthur', genre: 'yello' },
  {id: 5, picture: '1.jpg', name: 'Hydrogen', publisher: 'Arthur', genre: 'yello' },
  {id: 6, picture: '1.jpg', name: 'Hydrogen', publisher: 'Arthur' , genre: 'yello'},
  
];*/

@Component({
  selector: 'app-list-jeux',
  templateUrl: './list-jeux.component.html',
  styleUrls: ['./list-jeux.component.css']
})
export class ListJeuxComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['image', 'name', 'publisher', 'operations'];
  // dataSource = new MatTableDataSource<Game>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  viewGame(element: Game) {

  }

  editGame(element: Game) {

  }

  uploadGame(element: Game) {

  }

  deletGame(element: Game) {

  }

}

