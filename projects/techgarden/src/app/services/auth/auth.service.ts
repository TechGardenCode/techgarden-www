import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  authenticated = signal(false);

  checkAuthentication() {
    return this.http
      .get('/api/auth/me', {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(
        map((res: HttpResponse<unknown>) => {
          this.authenticated.set(res.ok);
          return res.ok;
        }),
        catchError((err) => {
          if (err.status === 401) {
            this.authenticated.set(false);
            return of(false);
          }
          return of(true);
        })
      );
  }

  me() {
    return this.http.get('/api/auth/me');
  }
}
