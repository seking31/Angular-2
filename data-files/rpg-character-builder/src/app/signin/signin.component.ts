import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="signin-form-container">
      <form
        [formGroup]="signinForm"
        (ngSubmit)="signin()"
        class="signin-form"
        novalidate
      >
        <h1>Complete the form below to sign in.</h1>
        <fieldset>
          <legend>User Sign In</legend>

          <!-- Email -->
          <label for="email">Email</label>
          <input
            formControlName="email"
            type="email"
            id="email"
            name="email"
            autocomplete="email"
            aria-describedby="emailHelp emailErrorRequired emailErrorFormat"
          />

          <small id="emailHelp" class="hint"
            >Use your account email address.</small
          >

          <small
            *ngIf="
              signinForm.controls['email'].touched &&
              signinForm.controls['email'].hasError('required')
            "
            id="emailErrorRequired"
            class="error"
          >
            Email is required.
          </small>
          <small
            *ngIf="
              signinForm.controls['email'].touched &&
              signinForm.controls['email'].hasError('email')
            "
            id="emailErrorFormat"
            class="error"
          >
            Invalid email address.
          </small>

          <!-- Password -->
          <label for="password">Password</label>
          <input
            formControlName="password"
            id="password"
            type="password"
            name="password"
            autocomplete="current-password"
            aria-describedby="passwordErrorRequired passwordErrorLength passwordErrorPattern"
          />

          <small
            *ngIf="
              signinForm.controls['password'].touched &&
              signinForm.controls['password'].hasError('required')
            "
            id="passwordErrorRequired"
            class="error"
          >
            Password is required.
          </small>
          <small
            *ngIf="
              signinForm.controls['password'].touched &&
              signinForm.controls['password'].hasError('minlength')
            "
            id="passwordErrorLength"
            class="error"
          >
            Password must be at least 8 characters long.
          </small>
          <small
            *ngIf="
              signinForm.controls['password'].touched &&
              signinForm.controls['password'].hasError('pattern')
            "
            id="passwordErrorPattern"
            class="error"
          >
            Password must contain at least one uppercase letter and one number.
          </small>

          <input type="submit" [disabled]="!signinForm.valid" value="Sign In" />
        </fieldset>

        <div class="helper-links">
          <a routerLink="/">Back to Home</a>
          <span aria-hidden="true">·</span>
          <a routerLink="/register">Create an Account</a>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .signin-form-container {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 2rem 1rem;
      }

      .signin-form {
        width: 100%;
        max-width: 520px;
        border-radius: 16px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        padding: 1.5rem 1.75rem;
      }

      h1 {
        font-size: 1.25rem;
        margin: 0 0 1rem 0;
      }

      fieldset {
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 1rem 1rem 1.25rem 1rem;
      }

      legend {
        padding: 0 0.5rem;
        font-weight: 600;
      }

      label {
        display: block;
        margin-top: 0.75rem;
        margin-bottom: 0.25rem;
        font-weight: 600;
      }

      input[type='email'],
      input[type='password'] {
        display: block;
        width: 100%;
        padding: 0.625rem 0.75rem;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        box-sizing: border-box;
      }

      input[type='email']:focus,
      input[type='password']:focus {
        outline: none;
        border-color: #6366f1;
      }

      input[type='submit'] {
        color: black;
        margin-top: 1rem;
        padding: 0.625rem 1rem;
        border: none;
        border-radius: 8px;
        background: white;
        font-weight: 600;
        cursor: pointer;
        float: right;
      }

      input[type='submit']:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .hint {
        display: block;
        font-size: 0.85rem;
        margin-top: 0.25rem;
      }

      .error {
        display: block;
        color: #dc2626;
        padding: 0.25rem 0 0 0;
        font-size: 0.9rem;
      }

      .helper-links {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        margin-top: 1.25rem;
        clear: both;
      }

      .helper-links a {
        color: #1d4ed8;
        text-decoration: none;
      }

      .helper-links a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class SigninComponent {
  signinForm: FormGroup = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/),
      ]),
    ],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  signin(): void {
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    const email = this.signinForm.controls['email'].value;
    const password = this.signinForm.controls['password'].value;

    if (this.authService.signin(email, password)) {
      const returnUrl =
        this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.router.navigate([returnUrl]);
    } else {
      alert('Invalid User');
    }
  }
}
