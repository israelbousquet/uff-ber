import { Injectable } from '@angular/core';
import { User } from '../interfaces/global-interfaces';

@Injectable({
  providedIn: 'root',
})

export class LocalService {
  constructor() {}

  set(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key: string) {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  get user(): User {
    return this.get("user");
  }

  get hasUser(): boolean {
    return this.user && Object.keys(this.user).length > 0;
  }

  get userIsDriver(): boolean {
    const user: User = this.user;
    if (user.driver_id) return true;
    else return false;
  }

}