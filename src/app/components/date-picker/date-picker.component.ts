import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DatePickerComponent implements OnInit {
  @Output() dobEmitter = new EventEmitter<any>();

  model: NgbDateStruct;

  constructor() { }

  ngOnInit() {
  }

  dob(event) {
    this.dobEmitter.emit(event);
  }



}
