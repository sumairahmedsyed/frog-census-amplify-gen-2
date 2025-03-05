import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Amplify } from 'aws-amplify';

// eslint-disable-next-line @nx/enforce-module-boundaries
import outputs from '../../../amplify_outputs.json';

Amplify.configure(outputs);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
