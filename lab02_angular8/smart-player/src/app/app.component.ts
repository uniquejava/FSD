import { Component, ViewChild } from '@angular/core';
import { SidemenuComponent } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(SidemenuComponent, { static: true }) sidemenuComponent;
  title = 'smart-player';

  handleToggleSideMenu() {
    this.sidemenuComponent.toggle();
  }
}
