import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropComponent } from './drag-and-drop.component';
import { SortablejsModule } from 'ngx-sortablejs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragAndDropRoutingModule } from './drag-and-drop.routing';

@NgModule({
  imports: [
    CommonModule,
    SortablejsModule,
    MatIconModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatListModule,

    DragAndDropRoutingModule
  ],
  declarations: [DragAndDropComponent]
})
export class DragAndDropModule { }
