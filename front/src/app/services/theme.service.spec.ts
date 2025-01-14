import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ThemeService } from './theme.service';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Theme } from '../models/theme.model';

describe('ThemeService', () => {
  let service: ThemeService;
  let httpMock: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ThemeService,
        { provide: AuthService, useValue: spy }
      ]
    });

    service = TestBed.inject(ThemeService);
    httpMock = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#unsubscribe', () => {
    it('should send a DELETE request to unsubscribe a user from a theme', () => {
      const userId = 1;
      const themeId = 1;
      const token = 'fake-token';
      authServiceSpy.getToken.and.returnValue(token);

      service.unsubscribe(userId, themeId).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne('http://localhost:8080/api/subscriptions');
      expect(req.request.method).toBe('DELETE');
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
      expect(req.request.body).toEqual({ userId, themeId });
      req.flush({});
    });

    it('should handle HTTP errors (with throwError)', () => {
      spyOn(service, 'unsubscribe').and.returnValue(
        throwError(() =>
          new HttpErrorResponse({
            status: 500,
            statusText: 'Server Error',
            error: 'Something went wrong',
          })
        )
      );

      const userId = 1;
      const themeId = 1;
      const token = 'fake-token';
      authServiceSpy.getToken.and.returnValue(token);

      service.unsubscribe(userId, themeId).subscribe(
        () => fail('expected an error, not themes'),
        (error: HttpErrorResponse) => {
          expect(error).toBeTruthy();
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Server Error');
          expect(error.error).toBe('Something went wrong');
        }
      );
    });
  });

  describe('#handleNoContentError', () => {
    it('should return an empty array if status is 204', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'No Content',
        status: 204,
        statusText: 'No Content'
      });

      service['handleNoContentError'](errorResponse).subscribe(result => {
        expect(result).toEqual([]);
      });
    });

    it('should call handleError if status is not 204', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'Server Error',
        status: 500,
        statusText: 'Server Error'
      });

      spyOn(service as any, 'handleError').and.returnValue(throwError(() => new Error('Server Error')));

      service['handleNoContentError'](errorResponse).subscribe(
        () => fail('expected an error, not themes'),
        (error) => {
          expect(error.message).toBe('Server Error');
        }
      );

      expect(service['handleError']).toHaveBeenCalledWith(errorResponse);
    });
  });
});