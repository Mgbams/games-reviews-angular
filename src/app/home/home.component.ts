import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Layout } from '../layout.model';
import { Game } from '../model/game.model';
import { Pageable } from '../model/pageable.model';
import { Router } from '@angular/router';
import { AddGameService } from '../services/add-game.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pageSize!: number;
  pageSizeOptions!: number[];
  length!: number;

  serverImgUrl = 'http://localhost:8080/images/';

  // Pagination initial data
  initialPageStart = 0;
  initialPageEnd = 6;

  cardsLayout!: Observable<Layout>;
  games: Game[] = [];
  msgError = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private homePageService: AddGameService,
    private route: Router
  ) {}

  ngOnInit(): void {
    //this.getGames();
    this.getPageableGames();

    this.cardsLayout = merge(
      this.breakpointObserver
        .observe([
          Breakpoints.Handset,
          Breakpoints.XSmall,
          Breakpoints.Small,
          Breakpoints.Medium,
        ])
        .pipe(
          map(({ matches }) => {
            if (matches) {
              console.debug('👉🏽 handset layout activated');
              return this.getHandsetLayout();
            }
            return this.getTabletLayout();
          })
        ),
      this.breakpointObserver.observe(Breakpoints.Tablet).pipe(
        map(({ matches }) => {
          if (matches) {
            return this.getTabletLayout();
          }
          return this.getTabletLayout();
        })
      ),
      this.breakpointObserver.observe(Breakpoints.Web).pipe(
        map(({ matches }) => {
          if (matches) {
            return this.getWebLayout();
          }
          return this.getTabletLayout();
        })
      )
    );
  }

  getHandsetLayout(): Layout {
    return {
      name: 'Handset',
      gridColumns: 1,
      cols: 1,
      rows: 1,
    };
  }

  getTabletLayout(): Layout {
    return {
      name: 'Tablet',
      gridColumns: 4,
      cols: 2,
      rows: 1,
    };
  }

  getWebLayout(): Layout {
    return {
      name: 'Web',
      gridColumns: 6,
      cols: 2,
      rows: 1,
    };
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
        },
        error: (error) => (this.msgError = error),
      });
  }

  getGames(): void {
    this.homePageService.getGames().subscribe({
      next: (data) => {
        this.games = data['content'];
        this.pageSizeOptions = data['pageable'];
        this.length = data.totalElements;
        this.pageSize = data.totalPages;
      },
      error: (error) => (this.msgError = error),
    });
  }

  moreDetails(id: number): void {
    const updateId = Number(id);
    this.route.navigate(['gameDescription', updateId]);
  }

  nextPage(event: any) {
    this.games = event['content'];
    this.pageSizeOptions = event['pageable'];
    this.length = event.totalElements;
    this.pageSize = event.totalPages;
  }
}
