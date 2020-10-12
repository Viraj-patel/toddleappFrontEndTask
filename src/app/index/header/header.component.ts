import { Component, OnInit } from '@angular/core';
import { ManageStandardService } from 'src/app/services/manage-standard.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { SavefileService } from 'src/app/services/savefile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  id: number;
  standards:any = [];
  data: object = {};
  fileToUpload : any;
  viewExistingStandard : any;
  content : any = '';

  constructor(private _manageStandard : ManageStandardService,private _saveService : SavefileService) { 
  }

  ngOnInit(): void {
    this.id=0;
    if(this._manageStandard.getStandard().length>0)
    {
      this.standards = this._manageStandard.getStandard();
      this.id=this._manageStandard.getStandard().length;
    }
    else
    {
      this.addStandard();
    }
  }
  
  addStandard(){
    this.data={
      id : this.id,
      parent : this.id,
      subparent : this.id,
      indentLevel : 0,
      standardValue : "",
      isDeleted : false
    }
    this.standards = this._manageStandard.addStandard(this.data);
    
  }

  add(){
    this.id++;
    this.addStandard();
  }

  onDrop(event : CdkDragDrop<string[]>){
    this._manageStandard.updateParent(event.currentIndex,true,event.previousIndex);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } 
  }

  save(){
    this._saveService.downloadFile(this.standards);
  }

  handleFileInput(fileList: FileList) {
  
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    
    fileReader.onloadend = function(x) {
      self.content=fileReader.result;
      self._manageStandard.loadStandard(self.content);
      self.ngOnInit()
    }

    fileReader.readAsText(file);
    
}
}
