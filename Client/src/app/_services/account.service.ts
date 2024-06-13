import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'http://localhost:5000/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();


  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((res:User) =>{
        const user = res;
        if (user)
          {
            localStorage.setItem('user', JSON.stringify(user));
          }
        })
      );
    }

    setCurrentUser(user: User)
    {
      this.currentUserSource.next(user);
    }
    
    logout()
    {
      localStorage.removeItem('user');
      this.currentUserSource.next(null);
    }
}
