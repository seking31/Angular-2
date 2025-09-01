import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { provideRouter } from '@angular/router';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, PlayersComponent],
      providers: [
        provideRouter([
          { path: 'players', component: PlayersComponent },
          { path: '', redirectTo: 'players', pathMatch: 'full' },
        ]),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'RPG Character Builder'
    );
  });

  it('should navigate to PlayersComponent when Players link is clicked', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const location = TestBed.inject(Location);

    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('a[routerLink="/players"]'));
    (link.nativeElement as HTMLAnchorElement).click();

    await fixture.whenStable();

    expect(location.path()).toBe('/players');
  });
});
