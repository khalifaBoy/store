import { Component, ViewChild, DoCheck } from '@angular/core';

import { AdSearch } from '../../components/ad-search.directive';
import { ComponentService } from '../../components/component.service';

import { SearchPiece } from '../../components/component';
import { Search } from '../../components/component.component';
import { BooksService } from 'src/app/books.service';
import { Books } from 'src/app/books';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements DoCheck {

  search : SearchPiece;
  keyword;
  page;
  
  
  constructor(private componentService: ComponentService, public bookService: BooksService) {

    this.search = this.componentService.getHomeComponents().search;
    this.keyword = bookService.getKeyword();
    this.page = bookService.getPage();

  }


  @ViewChild(AdSearch, {static: true}) SearchHost!: AdSearch;
  books?: Books[];

  
  ngOnInit() {

    this.loadComponent();

  }

  ngOnDestroy() {

    this.bookService.setKeyword(undefined);
    this.bookService.setPage(undefined);
    this.bookService.setStatus(false);
    this.bookService.setPages(1);

  }

  //using DoCheck to tap changes
  ngDoCheck(): void {

    //if keyword changes
    if(this.keyword!==this.bookService.getKeyword()) {
      this.keyword=this.bookService.getKeyword();

      //if keyword is defined and is not a empty string 
      if(this.keyword!==null && this.keyword!=='' && this.keyword!==undefined)
          this.bookService.fetchBooks('home')
          .subscribe(observer => {

            //when fetching failed an empty array is returned
            if(observer.docs.length===0) this.bookService.setStatus(null);
            else {

              this.bookService.setStatus(true);
              this.books = observer.docs;
              this.bookService.setPages(observer.numFound);

              //resetting memory data for each new keyword
              this.bookService.resetInMemoryData();
              this.bookService.insertDataIntoMemory(observer.docs, this.page);

            }

          });

    }
    
    if(this.page!==this.bookService.getPage()) {
      this.page=this.bookService.getPage();

      //if page changes
      //first attempting the fetch from memory
      if(this.keyword!==null && this.keyword!=='' && this.keyword!==undefined)
          this.bookService.fetchInMemoryBooks('home')
          .subscribe(observer => {

            //when fetching failed an empty array is returned
            //only when the data is fetched from server
            if(observer.docs.length===0) this.bookService.setStatus(null);
            else {

              this.bookService.setStatus(true);
              this.books = observer.docs;

              //only when the data is fetched from memory
              if(observer.numFound) {

                this.bookService.setPages(observer.numFound);
                this.bookService.insertDataIntoMemory(observer.docs, this.page);

              }

            }

          });

    }

  }
  
  //changes to search component on th basis of page
  //pages have different placeholder values
  loadComponent() {

    const viewContainerRef = this.SearchHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<Search>(this.search.component);
    componentRef.instance.data = this.search.data;

  }

}
