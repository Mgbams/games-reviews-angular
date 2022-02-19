import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { Game } from '../model/game.model';
import { AddGameService } from '../services/add-game.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() pageSize!: number;
  @Input() pageSizeOptions!: number[];
  @Input() length!: number;
  @Output() ChangePageOnClick: EventEmitter<any> = new EventEmitter<any>();

  // MatPaginator Output
  pageEvent!: PageEvent;
  msgError!:  string;

  constructor(private homePageService: AddGameService) { }

  ngOnInit(): void {
  }

  nextPage(event: PageEvent) {
    let page = Number(event.pageIndex.toString());
    let size = Number(event.pageSize.toString());

    this.homePageService.getPageableGames(page, size).subscribe({
      next: (data) => {
        this.ChangePageOnClick.emit(data);
      },
      error: (error) => (this.msgError = error),
    });
    
  }

}
