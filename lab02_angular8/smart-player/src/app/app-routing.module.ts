import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  { path: '', redirectTo: 'course', pathMatch: 'full' },
  { path: 'watch', component: HomeComponent, pathMatch: 'full' },
  { path: 'course', component: CourseComponent, pathMatch: 'full' },
  { path: '**', component: CourseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
