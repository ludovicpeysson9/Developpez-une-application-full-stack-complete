import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService],
        });

        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
        localStorage.clear(); 
    });

    describe('#login', () => {
        it('should send a POST request and return a token on success', () => {
            const mockResponse = { token: 'fake-jwt-token' };

            service.login('testuser', 'password123').subscribe((response) => {
                expect(response.token).toBe(mockResponse.token);
            });

            const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual({ identifier: 'testuser', password: 'password123' });
            req.flush(mockResponse);
        });

        it('should handle HTTP errors', () => {
            service.login('testuser', 'wrongpassword').subscribe(
                () => fail('expected an error, not a token'),
                (error: Error) => {
                    expect(error).toBeTruthy();
                    expect(error.message).toContain('Something bad happened');
                }
            );

            const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
            req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
        });
    });

    describe('#isTokenExpired', () => {
        it('should return true if the token is expired', () => {
            const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEwMDAwMDAwMDB9.abcdef';
            localStorage.setItem('access_token', expiredToken);

            expect(service.isTokenExpired()).toBeTrue();
        });

        it('should return false if the token is valid', () => {
            const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjQ3MDAwMDAwMDB9.abcdef'; 
            localStorage.setItem('access_token', validToken);
        
            expect(service.isTokenExpired()).toBeFalse();
        });
    });

    describe('#logout', () => {
        it('should clear localStorage on logout', () => {
            localStorage.setItem('user_id', '1');
            localStorage.setItem('username', 'testuser');
            localStorage.setItem('email', 'test@example.com');
            localStorage.setItem('access_token', 'fake-token');

            service.logout();

            expect(localStorage.getItem('user_id')).toBeNull();
            expect(localStorage.getItem('username')).toBeNull();
            expect(localStorage.getItem('email')).toBeNull();
            expect(localStorage.getItem('access_token')).toBeNull();
        });
    });

    describe('#register', () => {
        it('should send a POST request to register a new user', () => {
            const mockResponse = { message: 'User registered successfully' };

            service.register('testuser', 'test@example.com', 'password123').subscribe((response) => {
                expect(response.message).toBe(mockResponse.message);
            });

            const req = httpMock.expectOne('http://localhost:8080/api/auth/register');
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });
            req.flush(mockResponse);
        });
    });

    describe('#updateUser', () => {
        it('should send a PUT request to update user details', () => {
            const mockResponse = { message: 'User updated successfully' };
            const token = 'fake-token';
            localStorage.setItem('access_token', token);

            service.updateUser(1, 'newusername', 'newemail@example.com').subscribe((response) => {
                expect(response.message).toBe(mockResponse.message);
            });

            const req = httpMock.expectOne('http://localhost:8080/api/user/1');
            expect(req.request.method).toBe('PUT');
            expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
            expect(req.request.body).toEqual({ username: 'newusername', email: 'newemail@example.com' });
            req.flush(mockResponse);
        });
    });

    describe('#isLoggedIn', () => {
        it('should return true if the token is expired', () => {
            const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDAwMDAwMDB9.abcdef'; 
            localStorage.setItem('access_token', expiredToken);
          
            expect(service.isTokenExpired()).toBeTrue();
          });

        it('should return false if token is expired', () => {
            const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEwMDAwMDAwMDB9.abcdef';
            localStorage.setItem('access_token', expiredToken);

            expect(service.isLoggedIn()).toBeFalse();
        });
    });
});
