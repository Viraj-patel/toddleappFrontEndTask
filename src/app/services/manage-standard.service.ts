import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManageStandardService {
  standards: any = [];

  constructor() {}

  addStandard(data: any) {
    this.standards.push(data);
    return this.standards;
  }

  getStandard() {
    return this.standards;
  }

  updateStandard(id: number, data: any) {
    this.standards[id] = data;
  }

  updateStandardValue(value: string) {
    for (let i = 0; i < this.standards.length; i++) {
      this.standards[i].standardValue = value;
    }
  }

  deleteStandard(index: number) {
    let id = this.standards[index].id;
    for (let i = 0; i < this.standards.length; i++) {
      if (
        this.standards[i].parent == id ||
        this.standards[i].subparent == id ||
        this.standards[i].id == id
      ) {
        this.standards[i].isDeleted = true;
      }
    }
  }

  getStandardIndex(id: number) {
    for (let i = 0; i < this.standards.length; i++) {
      if (this.standards[i].id == id) {
        return i;
      }
    }
  }

  updateChild(id: number) {
    for (let i = 0; i < this.standards.length; i++) {
      if (this.standards[i].subparent == id && this.standards[i].parent != id) {
        this.standards[i].indentLevel--;
        this.updateIndent(i);
        this.standards[i].subparent = this.standards[i].id;
        this.standards[i].parent = id;
      }
    }
  }

  updateIndent(index: number) {
    switch (this.standards[index].indentLevel) {
      case 0: {
        this.standards[index].isParent = true;
        this.standards[index].isChild = false;
        this.standards[index].isSubChild = false;
        break;
      }
      case 1: {
        this.standards[index].isParent = false;
        this.standards[index].isChild = true;
        this.standards[index].isSubChild = false;
        break;
      }
      case 2: {
        this.standards[index].isParent = false;
        this.standards[index].isChild = false;
        this.standards[index].isSubChild = true;
        break;
      }
    }
  }

  updateParent(index: number, change?: boolean, currentIndex?: number) {
    let id = this.standards[index].id;

    let prev: number;
    prev = index - 1;
    while (prev > -1 && this.standards[prev].isDeleted) {
      prev--;
    }
    if (change) {
      index = currentIndex;
    }
    if (this.standards[index].indentLevel == 0) {
      this.standards[index].parent = id;
      this.standards[index].subparent = id;
      this.updateChild(id);
    } else if (this.standards[index].indentLevel == 1) {
      if (prev == -1) {
        this.standards[index].indentLevel--;
        this.updateIndent(index);
        this.standards[index].parent = id;
        this.standards[index].subparent = id;
        this.updateChild(id);
      } else {
        this.standards[index].parent = this.standards[prev].parent;
        this.standards[index].subparent = id;
      }
    } else if (this.standards[index].indentLevel == 2) {
      if (
        this.standards[index].indentLevel - this.standards[prev].indentLevel <=
        1
      ) {
        this.standards[index].parent = this.standards[prev].parent;
        this.standards[index].subparent = this.standards[prev].subparent;
      } else {
        this.standards[index].indentLevel--;
        this.updateIndent(index);
        this.standards[index].parent = this.standards[prev].parent;
        this.standards[index].subparent = id;
      }
    }
  }

  loadStandard(fileContent: string) {
    this.standards = [];
    this.standards = JSON.parse(fileContent);
  }
}
