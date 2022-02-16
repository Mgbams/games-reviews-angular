import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Game } from '../model/game.model';


const ELEMENT_DATA: Game[] = [
  {id: 1, image: '1.jpg', name: 'Hydrogen', publisher: 'Arthur' },
  {id: 2, image: '1.jpg', name: 'Hydrogen', publisher: 'Arthur' },
  {id: 3, image: '1.jpg', name: 'Hydrogen', publisher: 'Arthur' },
  {id: 4, image: '1.jpg', name: 'Hydrogen', publisher: 'Arthur' },
  {id: 5, image: '1.jpg', name: 'Hydrogen', publisher: 'Arthur' },
  {id: 6, image: '1.jpg', name: 'Hydrogen', publisher: 'Arthur' },
  
];

@Component({
  selector: 'app-list-jeux',
  templateUrl: './list-jeux.component.html',
  styleUrls: ['./list-jeux.component.css']
})
export class ListJeuxComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['image', 'name', 'publisher', 'operations'];
  dataSource = new MatTableDataSource<Game>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

