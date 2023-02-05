import { Component, inject } from '@angular/core';

import { NavigationExtras, Router,  } from '@angular/router';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.sass']
})


export class TrendingComponent {

  constructor(private router: Router) {}
  
  trendingSubjects = ['Java', 'JavaScript', 'Node', 'Express', 'React'];


  NavigateTo(subject: string) {

    const navigationExtras: NavigationExtras = {

      queryParams: { subject },
      preserveFragment: true

    };

    return this.router.navigate(['subject'], navigationExtras);

  }

}
