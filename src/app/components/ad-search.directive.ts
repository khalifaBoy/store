import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[search]',
})
export class AdSearch {

  constructor(public viewContainerRef: ViewContainerRef) { }
  
}

