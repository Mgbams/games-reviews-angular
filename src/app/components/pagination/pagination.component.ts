import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pageable!: Pageable;
  @Output() refreshPage: EventEmitter<any>;

  constructor() {
    this.refreshPage = new EventEmitter<any>();
  }

  ngOnInit(): void {

  }

  public onPageChange(event: PageEvent): void {
    this.pageable.size = event.pageSize;
    this.pageable.number = event.pageIndex;
    this.pageable.totalElements = event.length;
    this.refreshPage.emit(this.pageable);
  }

}

export class Pageable {

  number: number = 0;
  size: number = 5;
  totalElements!: number;

}
