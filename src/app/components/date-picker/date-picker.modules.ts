import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DatePickerComponent } from './date-picker.component';

@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule],
  declarations: [DatePickerComponent],
  exports: [DatePickerComponent],
  bootstrap: [DatePickerComponent]
})
export class DatePickerModule {}
