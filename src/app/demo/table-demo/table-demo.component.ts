import { Component, ComponentRef, OnInit } from '@angular/core';

import { tableData } from './../table-data';
import { ButtonsComponent } from '../buttons/buttons.component';
import { EditableComponent } from '../editable/editable.component';

@Component({
  selector: 'app-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.scss']
})
export class TableDemoComponent implements OnInit {
  public _func: any = this.onCellInit.bind(this);
  public _func2: any = this.onDataInit.bind(this);
  public _arr: { [row: number]: { [column: string]: EditableComponent } };
  public data: Array<any> = tableData;
  public rows: Array<any> = [];
  public summary = 'descripcion';

  /* eslint-disable max-len */
  public columns: Array<any> = [
    {
      title: 'Name',
      name: 'name',
      component: EditableComponent,
      init: this._func2,
      configurable: true,
      show: true
    },
    {
      title: 'Position',
      name: 'position',
      component: EditableComponent,
      init: this._func2,
      sort: false,
      configurable: true,
      show: true
    },
    {
      title: 'Office',
      name: 'office',
      component: EditableComponent,
      init: this._func2,
      sort: 'asc',
      configurable: true,
      show: true
    },
    {
      title: 'Department',
      name: ['department', 'name'],
      component: null,
      init: null,
      sort: null,
      configurable: true,
      show: true
    },
    {
      title: 'Extn.',
      name: 'ext',
      component: EditableComponent,
      init: this._func2,
      sort: '',
      configurable: true,
      show: true
    },
    {
      title: 'Start date',
      name: 'startDate',
      component: EditableComponent,
      init: this._func2,
      configurable: true,
      show: true
    },
    {
      title: 'Salary ($)',
      name: 'salary',
      component: EditableComponent,
      init: this._func2,
      configurable: true,
      show: true
    },
    {
      title: '',
      name: 'id',
      component: ButtonsComponent,
      init: this._func,
      sort: false,
      filter: false,
      configurable: true,
      show: true
    }
  ];
  /* eslint-enable max-len */

  public page = 1;
  public itemsPerPage = 10;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '', columnName: 'position' },
    configurableColumns: true
  };

  constructor() {
    this.length = this.data.length;
  }

  ngOnInit() {
    this.onChangeTable(this.config);
  }

  changePage(page: any, data: Array<any> = this.data): Array<any> {
    console.log(page);
    const start = (page.page - 1) * page.itemsPerPage;
    const end =
      page.itemsPerPage > -1 ? start + page.itemsPerPage : data.length;
    return data.slice(start, end);
  }

  changeSort(data: any, config: any) {
    if (!config.sorting) {
      return data;
    }

    const columns = this.config.sorting.columns || [];
    let columnName: string = null;
    let sort: string = null;

    columns.forEach((auxCol) => {
      if (auxCol.sort !== '') {
        columnName = auxCol.name;
        sort = auxCol.sort;
      }
    });

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  changeFilter(data: any, config: any): any {
    if (!config.filtering) {
      return data;
    }

    const filteredData: Array<any> = data.filter((item: any) =>
      item[config.filtering.columnName].match(
        this.config.filtering.filterString
      )
    );

    return filteredData;
  }

  onChangeTable(
    config: any,
    page: any = { page: this.page, itemsPerPage: this.itemsPerPage }
  ) {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    const filteredData = this.changeFilter(this.data, this.config);
    const sortedData = this.changeSort(filteredData, this.config);
    this.rows =
      page && config.paging ? this.changePage(page, sortedData) : sortedData;
    /*for (let i = 0; i < this._arr.length; i++) {
      if (!this.rows.find((row) => row.id === this._arr[i])) {
        delete this._arr[i];
      }
    }*/
    this.length = sortedData.length;
  }

  edit(row: number, id: number) {
    console.log('edit id: ' + id);
    this.setEditableComponent(row, true);
  }

  cancel(row: number, id: number) {
    console.log('cancel id: ' + id);
    this.setEditableComponent(row, false, false);
  }

  ok(row: number, id: number) {
    console.log('ok id: ' + id);
    const newRow: Array<any> = this.setEditableComponent(row, false, true);
    const updateRow: any = this.data.find((rowAux) => rowAux.id === id);

    newRow.forEach((newRowAux) => {
      updateRow[newRowAux] = newRowAux;
    });
  }

  setEditableComponent(row: number, value: boolean, ok?: boolean): Array<any> {
    const newRow: Array<any> = [];
    let editableComponent: { [column: string]: EditableComponent };

    if (this._arr && (editableComponent = this._arr[row])) {
      for (const columnName in editableComponent) {
        if (editableComponent.hasOwnProperty(columnName)) {
          editableComponent[columnName].editable = value;
          if (ok === true) {
            editableComponent[columnName].data =
              editableComponent[columnName].auxValue;
            newRow[columnName] = editableComponent[columnName].auxValue;
          } else if (ok === false) {
            editableComponent[columnName].auxValue =
              editableComponent[columnName].data;
          }
        }
      }
    }
    return newRow;
  }

  protected manageColumn(event: MouseEvent, configColumn) {
    event.stopPropagation();
    configColumn.show = !configColumn.show;
    const columnIndex = this.columns.findIndex(
      (col) => col.title === configColumn.title
    );
    const foundColumn = this.columns[columnIndex];
    if (foundColumn) {
      this.columns[columnIndex] = Object.assign(
        Object.create(foundColumn.constructor.prototype),
        foundColumn
      );
      this.onChangeTable(this.config);
    }
  }

  private onDataInit(
    component: ComponentRef<any>,
    identifier: any,
    data: any
  ): void {
    component.instance.data = data;
    component.instance.auxValue = data;
    this._arr = this._arr || {};
    const editableComponent: { [column: string]: EditableComponent } =
      this._arr[identifier.row] || {};
    editableComponent[identifier.column] = component.instance;
    this._arr[identifier.row] = editableComponent;
  }

  private onCellInit(
    component: ComponentRef<any>,
    identifier: any,
    id: any
  ): void {
    console.log('onCellInit: ', identifier);
    component.instance.cancel.subscribe(() => {
      component.instance._editMode = false;
      this.cancel(identifier.row, id);
    });
    component.instance.edit.subscribe(() => {
      component.instance._editMode = true;
      this.edit(identifier.row, id);
    });
    component.instance.ok.subscribe(() => {
      component.instance._editMode = false;
      this.ok(identifier.row, id);
    });
  }
}
