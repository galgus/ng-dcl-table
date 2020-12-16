import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PositioningService } from 'ngx-bootstrap/positioning';
import { BsDropdownModule, BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';

import { NgDclTableModule } from './modules/ngx-dcl-table/ng-dcl-table.module';

import { AppComponent } from './app.component';
import { TableDemoComponent } from './demo/table-demo/table-demo.component';
import { EditableComponent } from './demo/editable/editable.component';
import { ButtonsComponent } from './demo/buttons/buttons.component';
import { TableSectionComponent } from './demo/table-section/table-section.component';

@NgModule({
  declarations: [
    AppComponent,
    TableDemoComponent,
    EditableComponent,
    ButtonsComponent,
    TableSectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    PaginationModule.forRoot(),
    NgDclTableModule,
    BsDropdownModule
  ],
  entryComponents: [EditableComponent, ButtonsComponent],
  providers: [ComponentLoaderFactory, PositioningService, BsDropdownConfig],
  bootstrap: [AppComponent]
})
export class AppModule {}
