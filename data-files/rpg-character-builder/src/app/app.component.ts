import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="wrapper">
      <header class="banner">
        <h1 class="title">RPG Character Builder</h1>
      </header>

      <nav class="navbar">
        <a routerLink="/" routerLinkActive="active">Home</a>
      </nav>

      <main class="content">
        <router-outlet />
      </main>

      <footer class="footer">
        <nav class="footer-nav">
          <a routerLink="/" routerLinkActive="active">Home</a>
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
export class AppComponent {}
