import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { CourseModule } from './course/course.module';
import { HeaderComponent, SidemenuComponent } from './shared';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SidemenuComponent],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    CourseModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
