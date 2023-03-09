import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material';
import { BoardRoutingModule } from './board-routing.module';
import { PageComponent } from './page/page.component';
import { ColumnDialogComponent } from './components/column-dialog/column-dialog.component';
import { ColumnFormComponent } from './components/column-form/column-form.component';
import { ColumnComponent } from './components/column/column.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PageComponent,
    ColumnDialogComponent,
    ColumnFormComponent,
    ColumnComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class BoardModule {}
