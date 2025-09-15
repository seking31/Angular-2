import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  if (cookieService.get('session_user')) {
    // Allow navigation
    return true;
  } else {
    // Redirect to signin, preserving returnUrl
    router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
