import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AddGameService } from './add-game.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { defer, Observable } from 'rxjs';
import { Genre } from '../model/genre.model';

fdescribe('AddGameService', () => {
  let service: AddGameService;
  let http: HttpClient;
  let httpController: HttpTestingController;
  let BASE_URL = environment.url;
  let httpSpy: { get: jasmine.Spy };
  let expectedGenres: Genre[];

  beforeEach(() => {
    expectedGenres = [
      {
        id: 1,
        name: 'Action',
      },
    ] as Genre[];

    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AddGameService, { provide: HttpClient, useValue: httpSpy }],
    });
    service = TestBed.inject(AddGameService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
