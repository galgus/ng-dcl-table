import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  @Output() edit = new EventEmitter<any>();
  @Output() ok = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  private _editMode = false;

  constructor() {}

  public get editMode(): boolean {
    return this._editMode;
  }
}
