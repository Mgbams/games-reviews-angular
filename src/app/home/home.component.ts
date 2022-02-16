import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Layout } from '../layout.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cardsLayout!: Observable<Layout>;
  //public coucou!: string;
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.cardsLayout = merge(
      this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium]).pipe(
        map(({ matches }) => {
          if (matches) {
            console.debug('👉🏽 handset layout activated',);
            return this.getHandsetLayout();
          }
          return this.getTabletLayout();
        })),
      this.breakpointObserver.observe(Breakpoints.Tablet).pipe(
        map(({ matches }) => {
          if (matches) {
            console.debug('👉🏽  tablet layout activated', this.cardsLayout);
            return this.getTabletLayout();
          }
          return this.getTabletLayout();
        })),
      this.breakpointObserver.observe(Breakpoints.Web).pipe(
        map(({ matches }) => {
          if (matches) {
            console.debug('👉🏽  web layout activated', this.cardsLayout);
            return this.getWebLayout();
          }
          return this.getTabletLayout();
        })),
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
      rows: 1
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

}
