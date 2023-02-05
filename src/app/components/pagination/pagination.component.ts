import { Component } from '@angular/core';
import { BooksService } from 'src/app/books.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent {

  constructor(public booksService: BooksService) {}

  //updating pages here
  updatePage(bool: boolean) {

    this.booksService.setPage(bool ? 1 : -1);

  }
  
}
