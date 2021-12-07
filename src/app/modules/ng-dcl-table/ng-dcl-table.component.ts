import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-ng-dcl-table',
  templateUrl: './ng-dcl-table.component.html',
  styleUrls: ['./ng-dcl-table.component.scss']
})
export class NgDclTableComponent implements OnChanges {
  @Input() public rows: any[] = [];
  @Input() public config: any = {};
  @Input() public id = 'id';
  @Input() public cSelectAll: any = {};
  @Input() public setResponsive = false;
  @Input() public summary: string;

  @Output() public tableChanged = new EventEmitter<any>();

  private _columns: any[] = [];

  constructor() {}

  @Input() public get columns() {
    return this._columns;
  }
  public set columns(values: any[]) {
    values.forEach((value) => {
      const column = this._columns.find((col) => col.name === value.name);
      if (column) {
        Object.assign(column, value);
      } else {
        this._columns.push(value);
      }
    });
  }

  configColumns() {
    const columns: any[] = [];

    this.columns.forEach((column) => {
      if (column.sort) {
        columns.push(column);
      }
    });

    return { columns };
  }

  ngOnChanges(changes: SimpleChanges) {
    const value = 'columns';

    if (changes[value]) {
      this._columns = changes[value].currentValue;
    }
  }

  onChangeTable(column: any) {
    this._columns.forEach((col) => {
      if (col.name !== column.name && col.sort !== false) {
        col.sort = '';
      }
    });
    this.tableChanged.emit({ sorting: this.configColumns });
  }
}
