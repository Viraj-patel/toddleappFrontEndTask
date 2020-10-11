import { Component, Input, OnInit } from '@angular/core';
import { ManageStandardService } from 'src/app/services/manage-standard.service';

@Component({
  selector: 'app-secondary',
  templateUrl: './secondary.component.html',
  styleUrls: ['./secondary.component.css']
})
export class SecondaryComponent implements OnInit {

  @Input() id : any;

  data : any;
  index : any;

  isParent : boolean;
  isChild : boolean;
  isSubChild : boolean;
  updateIndent : boolean;

  standardValue : any;

  constructor(private _manageStandard : ManageStandardService) { }

  ngOnInit(): void {
    this.data = this._manageStandard.getStandard();
    this.index= this._manageStandard.getStandardIndex(this.id);
    this.standardValue = this.data[this.index].standardValue;
    this.getIndentClass();
  }



  getIndentClass(){
    this.index= this._manageStandard.getStandardIndex(this.id);
    if(this.data[this.index].indentLevel==0)
    {
      this.isParent = true;
      this.isChild=false;
      this.isSubChild=false;
    }
    else if(this.data[this.index].indentLevel==1)
    {
      this.isParent = false;
      this.isChild=true;
      this.isSubChild=false;
    }
    else if(this.data[this.index].indentLevel==2)
    {
      this.isParent = false;
      this.isChild=false;
      this.isSubChild=true;
    }
  }

  indentLeft(){
    this.index= this._manageStandard.getStandardIndex(this.id);
    if(this.data[this.index].indentLevel>0)
    {
      this.data[this.index].indentLevel--;
    }
    this._manageStandard.updateParent(this.index,false);
    this._manageStandard.updateStandard(this.index,this.data[this.index]);
    this.getIndentClass()
  }

  indentRight(){
    this.index= this._manageStandard.getStandardIndex(this.id);
    if(this.data[this.index].indentLevel<2 && this.data[0].id!=this.id)
    {
      this.data[this.index].indentLevel++;
    }
    this._manageStandard.updateParent(this.index,false);
    this._manageStandard.updateStandard(this.index,this.data[this.index]);
    this.getIndentClass();
  }
  deleteStandard(){
    this.index=this._manageStandard.getStandardIndex(this.id);
    this._manageStandard.deleteStandard(this.index);
  }

  updateStandard(){
    this.index= this._manageStandard.getStandardIndex(this.id);
    this.data[this.index].standardValue=this.standardValue;
    this._manageStandard.updateStandard(this.id,this.data[this.index]);
  }
}
