import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VideoPlayerComponent, PlayerComponent, ControlsComponent, PlaylistComponent } from './components';

@NgModule({
  declarations: [AppComponent, VideoPlayerComponent, PlayerComponent, ControlsComponent, PlaylistComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
