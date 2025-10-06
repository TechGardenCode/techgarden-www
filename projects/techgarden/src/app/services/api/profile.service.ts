import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  protected readonly http = inject(HttpClient);
  protected readonly authService = inject(AuthService);

  getProfileById(id: string) {
    return this.http.get(`/api/profile/${id}`);
  }

  getProfileByName(name: string) {
    const queryParams = { name };
    return this.http.get(`/api/profile/profile`, { params: queryParams });
  }
}
