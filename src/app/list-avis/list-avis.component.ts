import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Review } from '../model/reviews.model';

const ELEMENT_DATA: Review[] = [
  {
    id: 1,
    description: 'yello page',
    moderationDate: new Date(20 / 11 / 2019),
    publicationDate: new Date(15 - 11 - 2001),
    score: 5,
    gameId: 2,
    moderatorId: 3,
    playerId: 6,
    image: '4.jpg',
    name: 'Justin',
    publisher: 'Sly Boy',
  },
  {
    id: 2,
    description: 'yello page',
    moderationDate: new Date(20 / 11 / 2019),
    publicationDate: new Date(15 - 11 - 2001),
    score: 5,
    gameId: 2,
    moderatorId: 3,
    playerId: 6,
    image: '4.jpg',
    name: 'Abel',
    publisher: 'Sly Boy',
  },
  {
    id: 3,
    description: 'yello page',
    moderationDate: new Date(20 / 11 / 2019),
    publicationDate: new Date(15 - 11 - 2001),
    score: 5,
    gameId: 2,
    moderatorId: 3,
    playerId: 6,
    image: '4.jpg',
    name: 'Kieran',
    publisher: 'Sly Boy',
  },
  {
    id: 4,
    description: 'yello page',
    moderationDate: new Date(20 / 11 / 2019),
    publicationDate: new Date(15 - 11 - 2001),
    score: 5,
    gameId: 2,
    moderatorId: 3,
    playerId: 6,
    image: '4.jpg',
    name: 'Wissem',
    publisher: 'Sly Boy',
  },
  {
    id: 5,
    description: 'yello page',
    moderationDate: new Date(20 / 11 / 2019),
    publicationDate: new Date(15 - 11 - 2001),
    score: 5,
    gameId: 2,
    moderatorId: 3,
    playerId: 6,
    image: '4.jpg',
    name: 'Oleg',
    publisher: 'Sly Boy',
  },
  {
    id: 6,
    description: 'yello page',
    moderationDate: new Date(20 / 11 / 2019),
    publicationDate: new Date(15 - 11 - 2001),
    score: 5,
    gameId: 2,
    moderatorId: 3,
    playerId: 6,
    image: '4.jpg',
    name: 'Justin',
    publisher: 'Sly Boy',
  },
];

@Component({
  selector: 'app-list-avis',
  templateUrl: './list-avis.component.html',
  styleUrls: ['./list-avis.component.css'],
})
export class ListAvisComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'date sent',
    'game name',
    "player's pseudo",
    'note',
    'image',
    'statut',
    'operations',
  ];
  dataSource = new MatTableDataSource<Review>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {}

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

  viewReview(element: Review) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
