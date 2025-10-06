import { HttpClient, HttpResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { OidcUserInfo } from '@seed/models';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  authenticated = signal(false);
  user = signal<OidcUserInfo | undefined>(undefined);
  sub = computed(() => this.user()?.subject);

  checkAuthentication() {
    return this.http
      .get<OidcUserInfo>('/api/auth/me', {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(
        tap((res) => {
          this.user.set(res.body as OidcUserInfo)
        }),
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
