import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { RoomsComponent } from './pages/rooms/rooms.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'rooms', component: RoomsComponent },
      { path: 'bookings', component: BookingsComponent }
    ]
  },
  // { path: 'rooms', component: RoomsComponent },
  // { path: 'bookings', component: BookingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }