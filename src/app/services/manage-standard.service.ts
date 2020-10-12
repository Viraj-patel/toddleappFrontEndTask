import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageStandardService {

  standards : any = [];

  constructor() { }

  addStandard(data : any){
    this.standards.push(data);
    return this.standards;
  }

  getStandard(){
    return this.standards;
  }

  updateStandard(id : any , data: any){
    this.standards[id]=data;
  }

  updateStandardValue(value: any){
    for(let i=0;i<this.standards.length;i++)
    {
      this.standards[i].standardValue = value;
    }
  }

  deleteStandard(index:any)
  {
    let id = this.standards[index].id;
    for(let i=0;i<this.standards.length;i++)
    {
      if(this.standards[i].parent == id || this.standards[i].subparent == id || this.standards[i].id==id)
      {
        this.standards[i].isDeleted = true;
      }
    }
  }

  getStandardIndex(id : any){
    
    for(let i=0;i<this.standards.length;i++)
    {
      if(this.standards[i].id==id)
      {
        return i;
      }
    }
  }

  updateChild(id : any)
  {
    for(let i=0;i<this.standards.length;i++)
    {
      if(this.standards[i].subparent==id && this.standards[i].parent!=id)
      {
        this.standards[i].indentLevel--;
        this.standards[i].subparent = this.standards[i].id;
        this.standards[i].parent = id;
      }
    }
  }

  updateParent(index : any ,change? : boolean, currentIndex? :any){
    let id=this.standards[index].id;
    
    let prev: number;
    prev=index-1;
    while( prev>-1 && this.standards[prev].isDeleted )
    {
      prev--;
    }
    if(change)
    {
      index=currentIndex;
    }
    if(this.standards[index].indentLevel==0)
    {
      this.standards[index].parent=id;
      this.standards[index].subparent=id;
      this.updateChild(id);
    }
    else if(this.standards[index].indentLevel==1)
    {
      if(prev==-1)
      {
        this.standards[index].indentLevel--;
        this.standards[index].parent=id;
        this.standards[index].subparent=id;
        this.updateChild(id);
      }
      else
      {
        
        this.standards[index].parent=this.standards[prev].parent;
        this.standards[index].subparent=id;
      }
    }
    else if(this.standards[index].indentLevel==2)
    {
      if(this.standards[index].indentLevel-this.standards[prev].indentLevel<=1)
      {
        this.standards[index].parent=this.standards[prev].parent;
        this.standards[index].subparent=this.standards[prev].subparent;
      }
      else
      {
        this.standards[index].indentLevel--;
        this.standards[index].parent=this.standards[prev].parent;
        this.standards[index].subparent=id;
      }
    }
  }

  loadStandard(fileContent : any)
  {
    this.standards=[];
    this.standards=JSON.parse(fileContent);
  }
}
