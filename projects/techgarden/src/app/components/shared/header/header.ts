import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { SeedButton } from '@seed/button';
import { SeedIcon } from '@seed/icon';
import { SeedInput } from '@seed/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMenu } from '@ng-icons/lucide';
import { Breadcrumb } from '../../tmp/breadcrumb/breadcrumb';
import { MobileService } from '../../../services/mobile.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [Breadcrumb, SeedButton, SeedIcon, NgIcon, SeedInput, RouterModule],
  providers: [provideIcons({ lucideMenu })],
  templateUrl: './header.html',
  styleUrl: './header.css',
  encapsulation: ViewEncapsulation.None,
})
export class Header {
  mobileService = inject(MobileService);
  breadcrumbItems = input<{ url: string; label: string }[]>([]);
}
