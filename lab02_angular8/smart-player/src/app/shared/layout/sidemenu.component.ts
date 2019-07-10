import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  @ViewChild('menuRef', { static: true }) menuRef: ElementRef;
  constructor() {}

  ngOnInit() {}

  toggle() {
    this.menuRef.nativeElement.classList.toggle('hide');
  }
}
