import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { UserFormComponent } from './app/user-form.component';
import { UserDetailsComponent } from './app/user-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class App {}

const routes = [
  { path: '', component: UserFormComponent },
  { path: 'details', component: UserDetailsComponent }
];

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
});