import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class SavefileService {
  constructor() {}

  downloadFile(standard: any) {
    var data = new Blob([JSON.stringify(standard)], {
      type: 'text/json;charset=utf-8',
    });
    FileSaver.saveAs(data, 'standard.json');
  }
}
