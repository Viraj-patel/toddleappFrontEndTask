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

  moveUp(){
    
  }

  moveDown(){

  }

  updateParent(){
    this.index= this._manageStandard.getStandardIndex(this.id);
    let prev;
    // for(let i=1;i<this.data.length;i++)
    // {
      
    //   if(this.id == this.data[i].id)
    //   {
    //       prev=i-1;
    //   }
    // }
    prev=this.index-1;
    while(this.data[prev].isDeleted && prev>-1)
    {
      prev--;
    }
    if(this.data[this.index].indentLevel==0)
    {
      this.data[this.index].parent=this.id;
      this.data[this.index].subparent=this.id;
      this._manageStandard.updateChild(this.id);
    }
    else if(this.data[this.index].indentLevel==1)
    {
      if(prev==-1)
      {
        this.data[this.index].indentLevel--;
        this.data[this.index].parent=this.id;
        this.data[this.index].subparent=this.id;
        this._manageStandard.updateChild(this.id);
      }
      else
      {
        
        this.data[this.index].parent=this.data[prev].parent;
        this.data[this.index].subparent=this.id;
      }
    }
    else if(this.data[this.index].indentLevel==2)
    {
      if(this.data[this.index].indentLevel-this.data[prev].indentLevel<=1)
      {
        this.data[this.index].parent=this.data[prev].parent;
        this.data[this.index].subparent=this.data[prev].subparent;
      }
      else
      {
        this.data[this.index].indentLevel--;
        this.data[this.index].parent=this.data[prev].parent;
        this.data[this.index].subparent=this.id;
      }
    }
  }

  indentLeft(){
    this.index= this._manageStandard.getStandardIndex(this.id);
    if(this.data[this.index].indentLevel>0)
    {
      this.data[this.index].indentLevel--;
    }
    this.updateParent();
    this._manageStandard.updateStandard(this.id,this.data[this.index]);
    this.getIndentClass()
  }

  indentRight(){
    this.index= this._manageStandard.getStandardIndex(this.id);
    if(this.data[this.index].indentLevel<2 && this.data[0].id!=this.id)
    {
      this.data[this.index].indentLevel++;
    }
    this.updateParent();
    this._manageStandard.updateStandard(this.id,this.data[this.index]);
    this.getIndentClass();
  }
  deleteStandard(){
    this.index= this._manageStandard.getStandardIndex(this.id);
    this._manageStandard.deleteStandard(this.index);
  }

  updateStandard(){
    this.index= this._manageStandard.getStandardIndex(this.id);
    this.data[this.index].standardValue=this.standardValue;
    this._manageStandard.updateStandard(this.id,this.data[this.index]);
    // this._manageStandard.updateStandardValue(this.standardValue);
  }
}
