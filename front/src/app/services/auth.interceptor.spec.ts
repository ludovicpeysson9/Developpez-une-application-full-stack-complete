import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import {
    HTTP_INTERCEPTORS,
    HttpClient,
    HttpRequest,
} from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';

/**
 * Tests for AuthInterceptor
 */
describe('AuthInterceptor', () => {
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;
    let authServiceSpy: jasmine.SpyObj<AuthService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('AuthService', ['getToken']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: AuthService, useValue: spy },
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
            ],
        });

        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
        authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should add Authorization header if token is available', () => {
        const token = 'fake-token';
        authServiceSpy.getToken.and.returnValue(token);

        httpClient.get('/test-endpoint').subscribe(response => {
            expect(response).toBeTruthy();
        });

        const req = httpMock.expectOne('/test-endpoint');

        // Assert that the Authorization header is set
        expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
        req.flush({});
    });

    it('should not add Authorization header if token is not available', () => {
        authServiceSpy.getToken.and.returnValue(null);

        httpClient.get('/test-endpoint').subscribe(response => {
            expect(response).toBeTruthy();
        });

        const req = httpMock.expectOne('/test-endpoint');

        // Assert that the Authorization header is not set
        expect(req.request.headers.has('Authorization')).toBeFalse();
        req.flush({});
    });
});
