import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { Search } from '../component.component';
import { BooksService } from 'src/app/books.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SearchComponent implements Search{
  @Input() data : any;

  constructor(public booksService: BooksService) {}

  //setting keyword here
  Search() {

    this.booksService.setKeyword(this.data.keyword);

  }
  
}
