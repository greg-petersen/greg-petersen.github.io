import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRecordComponent } from './edit-record.component';

const routes: Routes = [
  {
    path: '',
    component: EditRecordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRecordRoutingModule { }
