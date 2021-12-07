import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editable',
  templateUrl: './editable.component.html'
})
export class EditableComponent implements OnInit {
  public data: any;
  public auxValue: any;

  private _editable = false;

  constructor() {}

  get editable(): boolean {
    return this._editable;
  }
  set editable(editable: boolean) {
    this._editable = editable;
  }

  ngOnInit() {}
}
