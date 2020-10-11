import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageStandardService {

  standards : any = [];

  constructor() { }

  addStandard(data : any){
    this.standards.push(data);
    console.log(this.standards)
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

  deleteStandard(id:any)
  {
    let deleteFrom = -1;
    let deleteCount=0;
    for(let i=0;i<this.standards.length;i++)
    {
      if(this.standards[i].parent == id || this.standards[i].subparent == id || this.standards[i].id==id)
      {
        this.standards[i].isDeleted = true;
        // if(deleteFrom==-1)
        //   deleteFrom=i;
        // deleteCount++;
      }
    }
    //this.standards.splice(deleteFrom,deleteCount);
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
    console.log("update child");
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
}
