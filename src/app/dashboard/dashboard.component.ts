import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private router: Router) {
  }

  redirect(path: string) {
    console.log('path:', path)
    this.router.navigate(['/', path]).then(nav => {
      console.log(nav);
    }, err => {
      console.log(err)
    });
  }
}
