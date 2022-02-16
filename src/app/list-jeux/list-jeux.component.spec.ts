import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJeuxComponent } from './list-jeux.component';

describe('ListJeuxComponent', () => {
  let component: ListJeuxComponent;
  let fixture: ComponentFixture<ListJeuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListJeuxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListJeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
