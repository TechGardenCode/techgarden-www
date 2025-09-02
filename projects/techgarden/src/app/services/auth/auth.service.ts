import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  authenticated = signal(false);
  user = signal<{ fullName: string } | undefined>(undefined);

  checkAuthentication() {
    return this.http
      .get('/api/auth/me', {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(
        tap(({ body }) => this.user.set(body as { fullName: string })),
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
}
