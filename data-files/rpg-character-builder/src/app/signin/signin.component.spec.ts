import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, BehaviorSubject, firstValueFrom, take } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

import { SigninComponent } from './signin.component';
import { AuthService } from '../auth.service';

@Injectable()
class MockAuthService {
  private users = [
    {
      empId: 1007,
      email: 'test@test.com',
      password: 'TestTest123',
    },
  ];
  private authState = new BehaviorSubject<boolean>(false);

  constructor(private cookieService: CookieService) {}

  getAuthState() {
    return this.authState.asObservable();
  }

  signin(email: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      this.cookieService.set('session_user', email, 1);
      this.authState.next(true);
      return true;
    } else {
      this.authState.next(false);
      return false;
    }
  }

  signout(): void {
    this.cookieService.deleteAll();
    this.authState.next(false);
  }
}

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let router: Router;
  let cookieService: CookieService;
  let authService: MockAuthService;

  const setFormValues = (email: string, password: string) => {
    component.signinForm.controls['email'].setValue(email);
    component.signinForm.controls['password'].setValue(password);
    component.signinForm.markAsDirty();
    component.signinForm.markAsTouched();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        SigninComponent,
        ReactiveFormsModule,
      ],
      providers: [
        CookieService,
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParamMap: { get: (_: string) => null } },
            queryParamMap: of(new Map()),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    cookieService = TestBed.inject(CookieService);
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;

    fixture.detectChanges();
  });

  afterEach(() => cookieService.deleteAll());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test 1: Should set cookie and authState to true on successful sign in', async () => {
    const email = 'test@test.com';
    const password = 'TestTest123';
    setFormValues(email, password);
    const navSpy = spyOn(router, 'navigate').and.resolveTo(true);

    component.signin();
    fixture.detectChanges();

    expect(cookieService.check('session_user')).toBeTrue();
    expect(cookieService.get('session_user')).toBe(email);

    const state = await firstValueFrom(
      authService.getAuthState().pipe(take(1))
    );
    expect(state).toBeTrue();

    expect(navSpy).toHaveBeenCalledWith(['/']);
  });

  it('Test 2: Should not set cookie and authState should remain false on unsuccessful sign in', async () => {
    const email = 'unknown@hogwarts.com';
    const password = 'BadPass123';
    setFormValues(email, password);
    const navSpy = spyOn(router, 'navigate');
    const alertSpy = spyOn(window, 'alert');

    component.signin();
    fixture.detectChanges();

    expect(cookieService.check('session_user')).toBeFalse();

    const state = await firstValueFrom(
      authService.getAuthState().pipe(take(1))
    );
    expect(state).toBeFalse();

    expect(navSpy).not.toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalled();
  });

  it('Test 3: Should call signin method on form submission', () => {
    const email = 'jane@jane.com';
    const password = 'JaneJane123';
    setFormValues(email, password);

    const signInSpy = spyOn(
      (component as any).authService,
      'signin'
    ).and.callThrough();

    component.signin();
    fixture.detectChanges();

    expect(signInSpy).toHaveBeenCalledWith(email, password);
  });
});
