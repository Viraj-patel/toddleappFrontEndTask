import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TopicComponent } from './topic/topic.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [HeaderComponent, TopicComponent],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule
  ],
  exports: [
    HeaderComponent,
    
  ]
})
export class IndexModule { }
