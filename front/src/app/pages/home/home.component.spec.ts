import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule], // Nécessaire pour tester la navigation
      providers: [
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /connexion on navigateToConnexion call', () => {
    component.navigateToConnexion();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/connexion']);
  });

  it('should navigate to /registration on navigateToRegistration call', () => {
    component.navigateToRegistration();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/registration']);
  });
});
