import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { InMemoryBooksService } from './in-memory-books.service';
import { Books } from './books';


@Injectable({
  providedIn: 'root'
})


export class BooksService {

  private keyword?: string;
  private page: number; 
  public pages: number; 
  private limit: number;
  private Uri = 'https://openlibrary.org/';
  public loadingStatus: boolean | undefined | null;

  constructor(private InMemoryBooks: InMemoryBooksService, private http: HttpClient) {

    this.page =1;
    this.limit=10;
    this.loadingStatus=false;
    this.pages=1;

   }


  setKeyword(word: string | undefined) {

    this.keyword = word;

  }

  setPage(num: number | undefined) {

    if(num) this.page+=num;
    else this.page=1;

  }

  setPages(numFound: number) {
    this.pages=Math.ceil(numFound/10);
  }

  setStatus(status: boolean | undefined | null) {
    this.loadingStatus=status;
  }

  getKeyword(): string | undefined {
    return this.keyword;
  }

  getPage(): number {
    return this.page
  }

  insertDataIntoMemory(books: Books[], page: number) {
    this.InMemoryBooks.addPage(books, page)
  }

  resetInMemoryData() {
    this.InMemoryBooks.reset();
  }


  fetchBooks(from: string): Observable<any> {
    let currentURI;
    this.setStatus(undefined);

      if(from==='home') {
        currentURI = this.Uri+'search.json?q='+this.keyword + '&';
      }

      else {
        currentURI = this.Uri+'subject/' + this.keyword + '.json?';
      }

      //constructing URL with params
      currentURI+=`page=${this.page}&limit=${this.limit}`;
      currentURI+= `&fields=numFound,start,title,first_publish_year,author_name,publish_year`;

      return this.http.get(currentURI)
      .pipe(
        tap(_=> this.log('success')),
        catchError(this.handleError<any>('fetch attempt', {docs: []}))
      );
      
  }

  fetchInMemoryBooks(from : string): Observable<any> {

    if(this.InMemoryBooks.checkPage(this.page)) 
    return of({docs: this.InMemoryBooks.getPage(this.page)});

    else return this.fetchBooks(from);

  }

  private log(message: string) {
    //pass later to a message service
    // console.log(message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(operation);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

