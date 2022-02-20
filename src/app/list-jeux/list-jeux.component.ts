import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Game } from '../model/game.model';
import { Router } from '@angular/router';
import { AddGameService } from '../services/add-game.service';
import { DialogService } from '../shared/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExcelService } from '../services/excel.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadImageComponent } from '../upload-image/upload-image.component';

@Component({
  selector: 'app-list-jeux',
  templateUrl: './list-jeux.component.html',
  styleUrls: ['./list-jeux.component.css'],
})
export class ListJeuxComponent implements OnInit, AfterViewInit {
  pageSize!: number;
  pageSizeOptions!: number[];
  length!: number;
  excelTitle = 'gameLists';
  dataToExport: any;

  serverImgUrl = 'http://localhost:8080/images/';

  // Pagination initial data
  initialPageStart = 0;
  initialPageEnd = 6;

  games: Game[] = [];
  msgError = '';

  displayedColumns: string[] = ['image', 'name', 'publisher', 'operations'];
  dataSource = new MatTableDataSource<Game>(this.games);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private homePageService: AddGameService,
    private route: Router,
    private dialogService: DialogService,
    private notification: MatSnackBar,
    private excelService: ExcelService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPageableGames();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  exportAsXLSX(): void {
    this.dataToExport = this.games.map((game) => {
      return {
        name: game.name,
        description: game.description,
        releaseDate: game.releaseDate,
        picture: game.picture,
      };
    });

    this.excelService.exportAsExcelFile(this.dataToExport, 'lists_of_games');
  }

  // pagination filtering
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getPageableGames(): void {
    this.homePageService
      .getPageableGames(this.initialPageStart, this.initialPageEnd)
      .subscribe({
        next: (data) => {
          this.games = data['content'];
          this.pageSizeOptions = data['pageable'];
          this.length = data.totalElements;
          this.pageSize = data.totalPages;
          console.log(this.games);
        },
        error: (error) => (this.msgError = error),
      });
  }

  getGames(): void {
    this.homePageService.getGames().subscribe({
      next: (data) => {
        // this.games = data['content'];
        // this.pageSizeOptions = data['pageable'];
        this.length = data.totalElements;
        // this.pageSize = data.totalPages;
      },
      error: (error) => (this.msgError = error),
    });
  }

  moreDetails(id: number): void {
    const updateId = Number(id);
    this.route.navigate(['/gameDescription', updateId]);
  }

  nextPage(event: any) {
    this.games = event['content'];
    //this.pageSizeOptions = event['pageable'];
    this.length = event.totalElements;
    this.pageSize = event.totalPages;
  }

  viewGame(game: Game) {
    this.route.navigate(['gameDescription', game.id]);
  }

  editGame(game: Game) {
    this.route.navigate(['edit-game', game.id]);
  }

  /*uploadGame(game: Game) {
    this.route.navigate(["uploadImage", game.id])
  }*/

  deletGame(game: Game) {
    this.openOnDeleteRequest(game);
  }

  // cancelling registration
  openOnDeleteRequest(game: Game) {
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete this game?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.homePageService.deleteGame(game.id).subscribe({
            next: () => {
              //this.openOnDeleteRequest();
              this.successfulDeletion();
              this.getPageableGames();
            },
            error: () => this.errorDuringDeletion(),
          });
        } else {
          // this.temporaryData = this.signUpForm.value; TODO
          return;
        }
      });
  }

  successfulDeletion() {
    this.notification.open(`Game successfully deleted!`, undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 2500,
      panelClass: 'custom-style',
    });
  }

  errorDuringDeletion() {
    this.notification.open("Game couldn't be deleted", undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 2500,
      panelClass: 'custom-style-error',
    });
  }

  uploadImage(game: Game) {

    const dialogRef = this.dialog.open(UploadImageComponent, {
      width: '50vw',
      height: '50vh',
      data: {id: 1},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log;
    });
  }
  
}
