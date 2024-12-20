import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScreenService {
    private screenWidth = new BehaviorSubject<number>(window.innerWidth);

    constructor() {
        window.addEventListener('resize', () => {
            this.screenWidth.next(window.innerWidth);
        });
    }

    isMobile(): boolean {
        return this.screenWidth.getValue() <= 768;
    }
}
