import { Component, OnInit } from '@angular/core';
import { AppLayoutService } from '../../services/app-layout.service';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {

  constructor(public layoutService: AppLayoutService) { }

  ngOnInit(): void {
  }

}
