import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  return authService.checkAuthentication().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      }
      window.location.assign('/api/auth/login');
      return false;
    })
  );
};
