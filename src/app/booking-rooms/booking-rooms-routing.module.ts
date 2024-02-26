import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingRoomsComponent } from './booking-rooms.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { BookRoomComponent } from './pages/book-room/book-room.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'rooms', pathMatch: 'full'
  },
  {
    path: '', component: BookingRoomsComponent, children: [
      { path: 'rooms', component: RoomsComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'rooms/book/:id', component: BookRoomComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoomsRoutingModule { }
