import { Component, ViewChild } from '@angular/core';

import { AdSearch } from '../../components/ad-search.directive';
import { ComponentService } from '../../components/component.service';

import { SearchPiece } from '../../components/component';
import { Search } from '../../components/component.component';
import { ActivatedRoute } from '@angular/router';


import { map } from 'rxjs/operators';
import { BooksService } from 'src/app/books.service';
import { Books } from 'src/app/books';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.sass']
})
export class SubjectComponent {
  search : SearchPiece;
  
  keyword;
  page;
  
  constructor(private componentService: ComponentService, private route: ActivatedRoute, public bookService: BooksService) {

    this.search = this.componentService.getSubjectComponents().search;
    this.keyword = bookService.getKeyword();
    this.page = bookService.getPage();

  }
  
  @ViewChild(AdSearch, {static: true}) SearchHost!: AdSearch;
  books?: Books[];


  ngOnInit() {

    this.loadComponent();

    this.route.queryParamMap
    .pipe(map(params => params.get('subject')))
    .subscribe(subject => {

        if(subject) this.bookService.setKeyword(subject);

    });

  }

  ngOnDestroy() {

    this.bookService.setKeyword(undefined);
    this.bookService.setPage(undefined);
    this.bookService.setStatus(false);
    this.bookService.setPages(1);

  }

  //similar to th other component
  ngDoCheck(): void {

    if(this.keyword!==this.bookService.getKeyword()) {
      this.keyword=this.bookService.getKeyword();

      if(this.keyword!==null && this.keyword!=='' && this.keyword!==undefined)
          this.bookService.fetchBooks('home')
          .subscribe(observer => {

            if(observer.docs.length===0) this.bookService.setStatus(null);

            else {

              this.bookService.setStatus(true);
              this.books = observer.docs;
              this.bookService.setPages(observer.numFound);

              this.bookService.resetInMemoryData();
              this.bookService.insertDataIntoMemory(observer.docs, this.page);

            }

          });
          
    }
    
    if(this.page!==this.bookService.getPage()) {
      this.page=this.bookService.getPage();

      if(this.keyword!==null && this.keyword!=='' && this.keyword!==undefined)
          this.bookService.fetchInMemoryBooks('home')
          .subscribe(observer => {

            if(observer.docs.length===0) this.bookService.setStatus(null);
            else {

              this.bookService.setStatus(true);
              this.books = observer.docs;
              
              if(observer.numFound) {

                this.bookService.setPages(observer.numFound);
                this.bookService.insertDataIntoMemory(observer.docs, this.page);

              }

            }

          });
    }

  }
  
  loadComponent() {

    const viewContainerRef = this.SearchHost.viewContainerRef;
    viewContainerRef.clear();
    
    const componentRef = viewContainerRef.createComponent<Search>(this.search.component);
    componentRef.instance.data = this.search.data;
  }
}
