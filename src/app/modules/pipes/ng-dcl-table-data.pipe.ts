import { Pipe, PipeTransform } from '@angular/core';
import { get, isArray } from 'lodash';

@Pipe({
  name: 'ngDclTableDataPipe'
})
export class NgDclTableDataPipe implements PipeTransform {
  transform(row: any, colName?: any): any {
    let field: any;

    if (isArray(colName)) {
      field = colName.join('.');
    } else {
      field = colName;
    }

    return get(row, field);
  }
}
