import { Injectable } from '@angular/core';
import { SearchPiece } from './component';
import { SearchComponent } from './search/search.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor() {}

  getHomeComponents() {

    return {search: new SearchPiece(SearchComponent, {placeholder: 'Search a Book by Title or Author', keyword: ""})}

  }

  getSubjectComponents() {

    return {search: new SearchPiece(SearchComponent, {placeholder: 'Search a Book by Subject', keyword: ""})}

  }
  
}
