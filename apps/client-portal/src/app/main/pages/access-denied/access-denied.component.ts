import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'monita-platform-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss'],
})
export class AccessDeniedComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  goBack() {
    window.history.back();
  }
}
