import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { LoginService } from './login.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

fdescribe('LoginService', () => {
  let service: LoginService;
  let http: HttpClient;
  let httpController: HttpTestingController;
  let BASE_URL = environment.url;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });
    service = TestBed.inject(LoginService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(http).toBeTruthy();
    expect(httpController).toBeTruthy();
  });

  it('login api', () => {
    const testData =  {
      id: 1,
      password: 'password',
      user_type: '',
      email: '',
      pseudonym: 'king',
      birth_date: new Date(2009-11-10),
    };

    const inputData = {
      id: 1,
      password: 'password',
      user_type: '',
      email: '',
      pseudonym: 'king',
      birth_date: new Date(2009-11-10),
    };

    service.postPlayer(inputData).subscribe({
      next: (val) => expect(val).toEqual(testData)
    });

    const req = httpController.expectOne(`${BASE_URL.playerSignUpUrl}`);

    expect (req.request.method).toEqual('POST');

    req.flush(testData);
  });

  it('call login() failed', () => {
    const emsg = 'status 500 error';

    const testData =  {
      id: 1,
      password: 'password',
      user_type: '',
      email: '',
      pseudonym: 'king',
      birth_date: new Date(2009-11-10),
    };

    const inputData = {
      id: 1,
      password: 'password',
      user_type: '',
      email: '',
      pseudonym: 'king',
      birth_date: new Date(2009-11-10),
    };

    service.postPlayer(inputData).subscribe({
      next: (val) => fail('should have failed with the 500 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    });

    const req = httpController.expectOne(`${BASE_URL.playerSignUpUrl}`);

    expect (req.request.method).toEqual('POST');

    req.flush(emsg, {status: 500, statusText: 'Server Error'});
  });

});
