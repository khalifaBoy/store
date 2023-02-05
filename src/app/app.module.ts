import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TrendingComponent } from './components/trending/trending.component';
import { ComponentService } from './components/component.service';
import { AdSearch } from './components/ad-search.directive';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrendingComponent,
    AdSearch,
    BookDetailsComponent,
    PaginationComponent,
    SubjectComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ComponentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
