import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentService } from './comment.service';
import { Comment } from 'src/app/models/comment.model';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

describe('CommentService', () => {
    let service: CommentService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CommentService]
        });

        service = TestBed.inject(CommentService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('#getCommentsByArticleId', () => {
        it('should return an Observable<Comment[]>', () => {
            const dummyComments: Comment[] = [
                { id: 1, articleId: 1, content: 'Test Comment 1', ownerId: 1, ownerUsername: 'Author 1' },
                { id: 2, articleId: 1, content: 'Test Comment 2', ownerId: 2, ownerUsername: 'Author 2' }
            ];

            service.getCommentsByArticleId(1).subscribe(comments => {
                expect(comments.length).toBe(2);
                expect(comments).toEqual(dummyComments);
            });

            const req = httpMock.expectOne('http://localhost:8080/api/comments/article/1');
            expect(req.request.method).toBe('GET');
            req.flush(dummyComments);
        });

        it('should handle HTTP errors (with throwError)', () => {
            spyOn(service, 'getCommentsByArticleId').and.returnValue(
                throwError(() =>
                    new HttpErrorResponse({
                        status: 500,
                        statusText: 'Server Error',
                        error: 'Something went wrong',
                    })
                )
            );

            service.getCommentsByArticleId(1).subscribe(
                () => fail('expected an error, not comments'),
                (error: HttpErrorResponse) => {
                    expect(error).toBeTruthy();
                    expect(error.status).toBe(500);
                    expect(error.statusText).toBe('Server Error');
                    expect(error.error).toBe('Something went wrong');
                }
            );
        });
    });

    describe('#createComment', () => {
        it('should create a new comment and return it', () => {
            const newComment: Comment = { id: 3, articleId: 1, content: 'New Comment', ownerId: 3, ownerUsername: 'New Author' };

            service.createComment(newComment).subscribe(comment => {
                expect(comment).toEqual(newComment);
            });

            const req = httpMock.expectOne('http://localhost:8080/api/comments');
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(newComment);
            req.flush(newComment);
        });

        it('should handle HTTP errors (with throwError)', () => {
            spyOn(service, 'createComment').and.returnValue(
                throwError(() =>
                    new HttpErrorResponse({
                        status: 500,
                        statusText: 'Server Error',
                        error: 'Something went wrong',
                    })
                )
            );

            const newComment: Comment = { id: 3, articleId: 1, content: 'New Comment', ownerId: 3, ownerUsername: 'New Author' };

            service.createComment(newComment).subscribe(
                () => fail('expected an error, not comment'),
                (error: HttpErrorResponse) => {
                    expect(error).toBeTruthy();
                    expect(error.status).toBe(500);
                    expect(error.statusText).toBe('Server Error');
                    expect(error.error).toBe('Something went wrong');
                }
            );
        });
    });
});