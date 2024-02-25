import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent implements OnInit{
  constructor(private authService: AuthService ) { }
  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }
}
