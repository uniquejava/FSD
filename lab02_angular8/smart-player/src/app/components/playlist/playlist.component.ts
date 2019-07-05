import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Course {
  id: number;
  title: string;
  url: string;
}
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  constructor() {}
  selectedIndex = 0;
  @Input() courses: Course[] = [];
  @Output() courseSelected = new EventEmitter();

  ngOnInit() {}

  handleSelection(index: number) {
    this.selectedIndex = index;
    this.courseSelected.emit(this.courses[this.selectedIndex]);
  }
}
