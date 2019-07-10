import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  @Output() toggleSideMenu = new EventEmitter();

  ngOnInit() {}

  clickMenuButton() {
    this.toggleSideMenu.emit();
  }
}
