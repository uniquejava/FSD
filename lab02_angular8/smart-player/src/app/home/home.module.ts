import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import {
  VideoPlayerComponent,
  PlayerComponent,
  ControlsComponent,
  PlaylistComponent,
} from './video-player';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    VideoPlayerComponent,
    PlayerComponent,
    ControlsComponent,
    PlaylistComponent,
  ],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
