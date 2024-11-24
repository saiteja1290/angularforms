import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserInfo {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userInfo = new BehaviorSubject<UserInfo | null>(null);
  userInfo$ = this.userInfo.asObservable();

  setUserInfo(info: UserInfo) {
    this.userInfo.next(info);
  }

  getUserInfo() {
    return this.userInfo.getValue();
  }
}