import { NgModule } from '@angular/core';
import { CourseComponent } from './course.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [CourseComponent],
})
export class CourseModule {}
