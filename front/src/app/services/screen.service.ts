import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * ScreenService is responsible for handling screen size related operations.
 * It provides methods to check if the screen size is mobile and to observe screen width changes.
 */
@Injectable({
    providedIn: 'root'
})
export class ScreenService {
    private readonly screenWidth: BehaviorSubject<number> = new BehaviorSubject<number>(window.innerWidth);

    constructor() {
        window.addEventListener('resize', () => {
            this.screenWidth.next(window.innerWidth);
        });
    }

    /**
     * Checks if the screen width is mobile size.
     * @returns A boolean indicating if the screen width is mobile size.
     */
    isMobile(): boolean {
        return this.screenWidth.getValue() <= 768;
    }

    /**
   * Returns an observable to observe screen width changes.
   * @returns An Observable of screen width.
   */
    getScreenWidth(): Observable<number> {
        return this.screenWidth.asObservable();
    }
}
