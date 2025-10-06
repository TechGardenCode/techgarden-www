import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { ActivatedRoute } from '@angular/router';
import { SeedButton } from '@seed/button';
import { hlmH3 } from '@spartan-ng/helm/typography';
import { ProfileService } from '../../services/api/profile.service';

@Component({
  selector: 'app-profile.page',
  imports: [SeedButton],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.css',
})
export class ProfilePage implements OnInit {
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly headerService = inject(HeaderService);
  protected readonly profileService = inject(ProfileService);
  protected readonly hlmH3 = hlmH3;
  protected readonly profileName!: string;

  constructor() {
    const profileName =
      this.activatedRoute.snapshot.paramMap.get('profileName');
    if (!profileName) {
      throw new Error('Profile name is required');
    }
    this.profileName = profileName;
    this.headerService.setBreadcrumbs(
      [
        {
          label:
            profileName.substring(0, 1).toUpperCase() +
            profileName.substring(1),
          url: '/' + profileName,
        },
      ],
      {
        withDefaults: true,
      }
    );
  }

  ngOnInit(): void {
    this.profileService.getProfileByName(this.profileName).subscribe();
  }
}
