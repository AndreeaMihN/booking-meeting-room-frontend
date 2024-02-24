import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private localStorageToken: LocalstorageService) {}

  canLoad() {
    const token = this.localStorageToken.getToken();

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  private _tokenExpired(expiration:any): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
