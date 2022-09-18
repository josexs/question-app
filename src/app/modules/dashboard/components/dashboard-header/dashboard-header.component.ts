import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dashboard-header',
  templateUrl: 'dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  @Input() totalQuestions: number;
  @Output() goToAdmin: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}
}
