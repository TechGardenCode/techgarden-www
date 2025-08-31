import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbDto } from '@seed/models';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterModule, NgIcon],
  providers: [provideIcons({ lucideChevronRight })],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb {
  breadcrumbItems = input<BreadcrumbDto[]>([]);
}
