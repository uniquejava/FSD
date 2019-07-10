import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CourseModule } from './course/course.module';
import { HeaderComponent, SidemenuComponent } from './shared';
import { CoreModule } from './core/core.module';
import { VideoPlayerModule } from './video-player';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [AppComponent, HeaderComponent, SidemenuComponent],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // ToastrModule added

    CourseModule,
    VideoPlayerModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
