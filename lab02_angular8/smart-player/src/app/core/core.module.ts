import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CourseService, ReqInterceptor, ResInterceptor } from '.';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [SharedModule],
  declarations: [],
  providers: [
    CourseService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ReqInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
