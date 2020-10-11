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

  deleteStandard(id:any)
  {
    let deleteFrom = -1;
    let deleteCount=0;
    for(let i=0;i<this.standards.length;i++)
    {
      if(this.standards[i].parent == id || this.standards[i].subparent == id || this.standards[i].id==id)
      {

        if(deleteFrom==-1)
          deleteFrom=i;
        deleteCount++;
      }
    }
    this.standards.splice(deleteFrom,deleteCount);
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
}
