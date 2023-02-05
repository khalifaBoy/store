import { TestBed } from '@angular/core/testing';

import { InMemoryBooksService } from './in-memory-books.service';

describe('InMemoryBooksService', () => {
  let service: InMemoryBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
