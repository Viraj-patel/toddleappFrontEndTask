import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryComponent } from './primary/primary.component';
import { SecondaryComponent } from './secondary/secondary.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [PrimaryComponent, SecondaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule
  ],
  exports: [
    PrimaryComponent,
    
  ]
})
export class IndexModule { }
