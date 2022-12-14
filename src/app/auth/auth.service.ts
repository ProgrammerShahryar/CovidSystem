import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable ({providedIn: 'root' })
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  createUser(username: string, password: string){
    const authData: AuthData = {username: username, password: password};
    this.http.post ('http://localhost:3000/api/user/register', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

   login(username: string, password: string){
     const authData: AuthData = {username: username, password: password};
     this.http.post <{token: string}> ('http://localhost:3000/api/user/login', authData)
       .subscribe(response =>{
        const token = response.token;
        this.token = token;
        this.authStatusListener.next(true);
        if(username == 'patient' && password == 'patient'){
          this.router.navigate(['history']);
        }
        if(username == 'tester' && password == 'tester'){
          this.router.navigate(['select']);
        }
        if(username == 'officer' && password == 'officer'){
          this.router.navigate(['report']);
        }
        if(username == 'manager' && password == 'manager'){
          this.router.navigate(['register']);
        }
     });
   }

  logout(){
    this.token = null;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }
}
