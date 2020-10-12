import { Component, Input, OnInit } from '@angular/core';
import { ManageStandardService } from 'src/app/services/manage-standard.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
})
export class TopicComponent implements OnInit {
  @Input() id: number;

  data: object;
  index: any;

  isParent: boolean;
  isChild: boolean;
  isSubChild: boolean;
  updateIndent: boolean;

  standardValue: any;

  constructor(private _manageStandard: ManageStandardService) {}

  ngOnInit(): void {
    this.data = this._manageStandard.getStandard();
    this.index = this._manageStandard.getStandardIndex(this.id);
    this.standardValue = this.data[this.index].standardValue;
    this.getIndentClass();
  }

  getIndentClass() {
    this.index = this._manageStandard.getStandardIndex(this.id);
    this._manageStandard.updateIndent(this.index);
  }

  indentLeft() {
    this.index = this._manageStandard.getStandardIndex(this.id);
    if (this.data[this.index].indentLevel > 0) {
      this.data[this.index].indentLevel--;
    }
    this._manageStandard.updateParent(this.index, false);
    this._manageStandard.updateStandard(this.index, this.data[this.index]);
    this.getIndentClass();
  }

  indentRight() {
    this.index = this._manageStandard.getStandardIndex(this.id);
    if (this.data[this.index].indentLevel < 2 && this.data[0].id != this.id) {
      this.data[this.index].indentLevel++;
    }
    this._manageStandard.updateParent(this.index, false);
    this._manageStandard.updateStandard(this.index, this.data[this.index]);
    this.getIndentClass();
  }
  deleteStandard() {
    this.index = this._manageStandard.getStandardIndex(this.id);
    this._manageStandard.deleteStandard(this.index);
  }

  updateStandard() {
    this.index = this._manageStandard.getStandardIndex(this.id);
    this.data[this.index].standardValue = this.standardValue;
    this._manageStandard.updateStandard(this.id, this.data[this.index]);
  }
}
