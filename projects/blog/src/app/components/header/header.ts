import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { Breadcrumb } from '../breadcrumb/breadcrumb';
import { SeedButton } from '@seed/components/button/seed-button';
import { SeedIcon } from '@seed/components/icon/seed-icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMenu } from '@ng-icons/lucide';
import { MobileService } from '../../services/mobile.service';

@Component({
  selector: 'app-header',
  imports: [Breadcrumb, SeedButton, SeedIcon, NgIcon],
  providers: [provideIcons({ lucideMenu })],
  templateUrl: './header.html',
  styleUrl: './header.css',
  encapsulation: ViewEncapsulation.None,
})
export class Header {
  mobileService = inject(MobileService);
  breadcrumbItems = input<{ url: string; label: string }[]>([]);
}
