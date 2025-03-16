import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRecordRoutingModule } from './edit-record-routing.module';
import { EditRecordComponent } from './edit-record.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    EditRecordRoutingModule
  ],
  declarations: [EditRecordComponent]
})
export class EditRecordModule { }
