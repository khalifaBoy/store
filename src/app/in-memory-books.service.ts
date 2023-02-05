import { Injectable } from '@angular/core';
import { Books } from './books';




@Injectable({
  providedIn: 'root'
})



export class InMemoryBooksService {
  private BookStore: Books[][];
  private pages: number[];


  constructor() {
    this.BookStore = [];
    this.pages= [];
  }

  //for adding a new page
  addPage(books: Books[], page: number) {

    //when the already 5 pages are present
    if(this.BookStore.length===5) {

      //removing from front and adding to back
      if(page>this.pages[this.pages.length-1]) {

        this.BookStore.shift();
        this.BookStore.push(books);

        this.pages.shift();
        this.pages.push(page);

      }

      //removing from back and adding to front
      if(page<this.pages[0]) {

        this.BookStore.pop();
        this.BookStore.unshift(books);

        this.pages.pop();
        this.pages.unshift(page);

      }


    }

    else {

      //when no page is present
      if(this.pages.length === 0) {

        this.BookStore.push(books);
        this.pages.push(page);

      }

      //adding to the back of array
      if(page>this.pages[this.pages.length-1]) {

        this.BookStore.push(books);
        this.pages.push(page);

      }

      //adding to the front of array
      if(page<this.pages[0]) {

        this.BookStore.unshift(books);
        this.pages.unshift(page);

      }

    }

  }

  //getting a page 
  getPage(page: number) {

    const Index = this.pages.indexOf(page);
    return (this.BookStore[Index]);

  }

  //check for the presence of page
  checkPage(page: number): boolean {

    return this.pages.includes(page);

  }

  reset() {

    this.BookStore = [];
    this.pages = [];

  }
}
