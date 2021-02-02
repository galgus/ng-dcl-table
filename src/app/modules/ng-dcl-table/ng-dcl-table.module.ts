import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DclModule } from '@galgus/ng-dcl';

import { NgDclTableComponent } from './ng-dcl-table.component';
import { NgDclTableFilteringDirective } from './directives/ng-dcl-table-filtering.directive';
import { NgDclTablePagingDirective } from './directives/ng-dcl-table-paging.directive';
import { NgDclTableSortingDirective } from './directives/ng-dcl-table-sorting.directive';
import { NgDclTableDataPipe } from '../pipes/ng-dcl-table-data.pipe';

@NgModule({
  imports: [CommonModule, DclModule],
  declarations: [
    NgDclTableComponent,
    NgDclTableFilteringDirective,
    NgDclTablePagingDirective,
    NgDclTableSortingDirective,
    NgDclTableDataPipe
  ],
  exports: [
    NgDclTableComponent,
    NgDclTableFilteringDirective,
    NgDclTablePagingDirective,
    NgDclTableSortingDirective
  ],
  providers: [],
  entryComponents: [NgDclTableComponent]
})
export class NgDclTableModule {}
