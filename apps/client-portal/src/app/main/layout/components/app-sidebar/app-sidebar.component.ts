import { Component, ElementRef, OnInit } from '@angular/core';
import { AppLayoutService } from '../../services/app-layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent implements OnInit {

  constructor(public layoutService: AppLayoutService, public el: ElementRef) { }

  ngOnInit(): void {
  }

}
