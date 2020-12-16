import {
  Directive,
  Output,
  Input,
  EventEmitter,
  ElementRef,
  Renderer2,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appNgDclTableFiltering]'
})
export class NgDclTableFilteringDirective {
  @Input() public ngTableFiltering: any = {
    filterString: '',
    columnName: 'name'
  };

  @Output() public tableChanged = new EventEmitter<any>();

  constructor(private element: ElementRef, private renderer: Renderer2) {
    // Set default value for filter
    this.renderer.setProperty(
      this.element,
      'value',
      this.ngTableFiltering.filterString
    );
  }

  @HostListener('input', ['$event.target.value'])
  onChangeFilter(event: any) {
    this.ngTableFiltering.filterString = event;
    this.tableChanged.emit({ filtering: this.ngTableFiltering });
  }
}
