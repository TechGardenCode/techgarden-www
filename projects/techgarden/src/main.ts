import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import posthog from 'posthog-js';
import { environment } from './environments/environment';

if (environment.POSTHOG_ENABLED) {
  posthog.init(environment.POSTHOG_KEY, {
    api_host: environment.POSTHOG_HOST,
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    defaults: '2025-05-24',
  });
}

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
