import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import {
  PlayerComponent,
  ControlsComponent,
  PlaylistComponent,
} from './components';
import { VideoPlayerComponent } from './video-player.component';

@NgModule({
  declarations: [
    VideoPlayerComponent,
    PlayerComponent,
    ControlsComponent,
    PlaylistComponent,
  ],
  imports: [SharedModule],
})
export class VideoPlayerModule {}
