import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard.service';
export const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  { path: 'booking', loadChildren: () => import('./booking-rooms/booking-rooms.module').then(m => m.BookingRoomsModule), canLoad: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
