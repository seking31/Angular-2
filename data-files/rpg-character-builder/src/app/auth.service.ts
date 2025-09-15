export interface User {
  empId: number;
  email: string;
  password: string;
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[];
  private authState = new BehaviorSubject<boolean>(false);

  constructor(private cookieService: CookieService, private router: Router) {
    this.users = [
      {
        empId: 1007,
        email: 'jane@jane.com',
        password: 'JaneJane123',
      },
    ];
  }

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
    this.router.navigate(['/signin']).then(() => {});
  }

  isAuthenticated(): boolean {
    return (
      this.cookieService.check('session_user') && this.authState.value === true
    );
  }
}
