import { Component, Input } from '@angular/core';
import { Books } from 'src/app/books';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.sass']
})

export class BookDetailsComponent {
  @Input() Books?: Books[];

  isSortedOnce = [false, false];



  ngOnInit() {
    
    //if books are defined sorting the publish_year in deascending order
    //to obtain the last publish year
    if(this.Books) {

      this.Books = this.Books.map(book => {
        let sortedYears;
        if(book.publish_year) sortedYears = [...book.publish_year];

        if(sortedYears) sortedYears = sortedYears.sort((a, b) => b-a);
        return {...book, publish_year: sortedYears};

      })

    }

  }

  //for sorting the current for either first_publish_year or last_publish_year
  //in ascending order
  Sort(type: string) {

    if(type==='latest' && !this.isSortedOnce[0]) {
      let sortedBooks;
      if(this.Books) sortedBooks = [...this.Books];

      //mark for once sorted
      if(sortedBooks) {

        this.isSortedOnce[0]=true;
        this.isSortedOnce[1]=false;

      }

      if(sortedBooks) this.Books = this.SortFor(type, sortedBooks);

    }

    else if(type==='first' && !this.isSortedOnce[1]) {

      let sortedBooks;
      if(this.Books) sortedBooks = [...this.Books];

      if(sortedBooks) {

        this.isSortedOnce[0]=false;
        this.isSortedOnce[1]=true;

      }


      if(sortedBooks) this.Books = this.SortFor(type, sortedBooks);

    }

    //if once the results were sorted, reversing the order
    else {

        let reversedSorted;
        if(this.Books) reversedSorted = [...this.Books];

        if(reversedSorted) reversedSorted = reversedSorted.reverse();

        this.Books = reversedSorted;

    }
  }


  //sorting
  SortFor(type: string, books: Books[]): Books[] {
      
    if(type==='latest') {

      return books.sort((a, b) => {

        if(a.publish_year && b.publish_year) {

          return a.publish_year[0] - b.publish_year[0];

        } else return 0;

      });

    }

    else {

      return books.sort((a, b) => {

        if(a.first_publish_year && b.first_publish_year) {

          return a.first_publish_year - b.first_publish_year;

        } else return 0;

      });

    }

  }
}
