import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavigationBarComponent } from './component/navigation-bar/navigation-bar.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DashboardComponent,
    NavigationBarComponent,
    BookingsComponent,
    RoomsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule
  ],
  exports: [NavigationBarComponent]
})
export class DashboardModule { }
