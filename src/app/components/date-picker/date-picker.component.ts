import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DatePickerComponent implements OnInit, AfterViewChecked {
  @Output() dob = new EventEmitter<any>();

  model: NgbDateStruct;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    this.dob.emit(this.model);
  }

}
