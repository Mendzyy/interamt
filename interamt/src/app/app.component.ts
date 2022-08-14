import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Länder', url: '/folder/countries', icon: 'globe' },
    { title: 'Projekte', url: '/folder/projects', icon: 'folder' },
  ];
  constructor() {}
}
