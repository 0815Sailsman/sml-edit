import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { SmlEditComponent } from './app/sml-edit.component';

bootstrapApplication(SmlEditComponent, appConfig)
  .catch((err) => console.error(err));
