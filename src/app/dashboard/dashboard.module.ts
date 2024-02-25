import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavigationBarComponent } from './component/navigation-bar/navigation-bar.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { RouterModule } from '@angular/router';
import { RoomCardComponent } from './component/room-card/room-card.component';
import { BookRoomComponent } from './pages/book-room/book-room.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamCardComponent } from './component/team-card/team-card.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavigationBarComponent,
    BookingsComponent,
    RoomsComponent,
    RoomCardComponent,
    BookRoomComponent,
    TeamCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' } 
  ],
  exports: [NavigationBarComponent]
})
export class DashboardModule { }
