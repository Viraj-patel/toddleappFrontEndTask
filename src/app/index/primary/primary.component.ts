import { Component, OnInit } from '@angular/core';
import { ManageStandardService } from 'src/app/services/manage-standard.service';

@Component({
  selector: 'app-primary',
  templateUrl: './primary.component.html',
  styleUrls: ['./primary.component.css']
})
export class PrimaryComponent implements OnInit {
  id: any;
  standards:any = {};
  data: any = {};

  constructor(private _manageStandard : ManageStandardService) { 
  }

  ngOnInit(): void {
    this.id=0;
    this.addStandard();
    
  }
  
  addStandard(){
    this.data={
      id : this.id,
      parent : this.id,
      subparent : this.id,
      indentLevel : 0,
      standardValue : ""
      
    }
    this.standards = this._manageStandard.addStandard(this.data);
    
  }

  add(){
    this.id++;
    this.addStandard();
  }

}
