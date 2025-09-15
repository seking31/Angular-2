import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="wrapper">
      <header class="banner">
        <h1 class="title">RPG Character Builder</h1>
      </header>

      <!-- Navigation -->
      <nav class="navbar">
        <a
          routerLink="/"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          >Home</a
        >
        <a routerLink="/players" routerLinkActive="active">Players</a>
        <a routerLink="/create-guild" routerLinkActive="active">Create Guild</a>
        <a routerLink="/create-character" routerLinkActive="active"
          >Create Character</a
        >
        <a routerLink="/character-faction" routerLinkActive="active"
          >Character Faction</a
        >

        <!-- Auth controls -->
        <span class="auth-controls" *ngIf="isAuthenticated; else signInLink">
          Welcome {{ currentUserEmail }} |
          <button class="signout-btn" (click)="signout()">Sign Out</button>
        </span>
        <ng-template #signInLink>
          <a routerLink="/signin" routerLinkActive="active">Sign In</a>
        </ng-template>
      </nav>

      <!-- Main content -->
      <main class="content">
        <router-outlet />
      </main>

      <!-- Footer -->
      <footer class="footer">
        <nav class="footer-nav">
          <a
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            >Home</a
          >
          <a routerLink="/players" routerLinkActive="active">Players</a>
          <a routerLink="/create-guild" routerLinkActive="active"
            >Create Guild</a
          >
          <a routerLink="/create-character" routerLinkActive="active"
            >Create Character</a
          >
          <a routerLink="/character-faction" routerLinkActive="active"
            >Character Faction</a
          >

          <!-- Auth controls footer -->
          <span
            class="auth-controls"
            *ngIf="isAuthenticated; else footerSignIn"
          >
            Welcome {{ currentUserEmail }} |
            <button class="signout-btn" (click)="signout()">Sign Out</button>
          </span>
          <ng-template #footerSignIn>
            <a routerLink="/signin" routerLinkActive="active">Sign In</a>
          </ng-template>
        </nav>
        <p>&copy; 2025 RPG Character Builder</p>
      </footer>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: Arial, sans-serif;
        background: #1c1c24;
        color: #eee;
        min-height: 100vh;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      .banner {
        background: #444;
        color: #fff;
        padding: 1rem;
        text-align: center;
      }

      .navbar,
      .footer-nav {
        display: flex;
        gap: 1rem;
        background: #2a2a33;
        padding: 0.5rem 1rem;
        flex-wrap: wrap;
        align-items: center;
      }

      .navbar a,
      .footer-nav a {
        color: #eee;
        text-decoration: none;
        padding: 0.5rem 0.75rem;
      }

      .navbar a:hover,
      .footer-nav a:hover,
      .navbar a.active,
      .footer-nav a.active {
        background: #678cec;
        color: #000;
        border-radius: 4px;
      }

      .auth-controls {
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .signout-btn {
        background: #ef4444;
        color: #fff;
        border: none;
        padding: 0.4rem 0.75rem;
        border-radius: 4px;
        cursor: pointer;
      }

      .signout-btn:hover {
        background: #dc2626;
      }

      .content {
        flex: 1;
        padding: 1rem;
      }

      .footer {
        background: #333;
        color: #ccc;
        text-align: center;
        padding: 1rem;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  currentUserEmail: string | null = null;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((state) => {
      this.isAuthenticated = state;
      this.currentUserEmail = state
        ? this.cookieService.get('session_user')
        : null;
    });
  }

  signout(): void {
    this.authService.signout();
  }
}
