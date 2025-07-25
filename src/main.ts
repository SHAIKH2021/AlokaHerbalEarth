import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig,  // keep your existing routing and other providers
  providers: [
    ...(appConfig.providers || []), // merge existing providers
    provideHttpClient()             // add HttpClient provider
  ]
}).catch((err) => console.error(err));
