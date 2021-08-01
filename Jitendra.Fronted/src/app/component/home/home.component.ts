import { Component, OnInit } from '@angular/core';
import { User } from 'oidc-client';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Angular11CrudDemo';
  public isUserAuthenticated = false;
  public isUserAdmin = false;
  isSignedIn: boolean;
  messages: string[] = [];

  currentUser: User;
  constructor(private authService: AuthService) {
    this.getAsyncGetUserData();
   }

  ngOnInit(): void {
    this.authService.loginChanged
      .subscribe(res => {
        debugger;
        this.isUserAuthenticated = res;
        this.isAdmin();
      });
    this.authService.isAuthenticated()
      .then(isAuth => {
        this.isUserAuthenticated = isAuth;
      });
  }
  public login = () => {
    this.authService.login();
  }

  public logout = () => {
    this.authService.logout();
  }

  public isAdmin = () => {
    return this.authService.checkIfUserIsAdmin()
      .then(res => {
        this.isUserAdmin = res;
      });
  }


  get currentUserJson(): string {
    return JSON.stringify(this.currentUser, null, 2);
  }

  async getAsyncGetUserData(): Promise<void> {
    const user = await this.authService.getUser();
    this.currentUser = user;
    if (user) {
      const access_token = user.access_token;
      localStorage.setItem('token',access_token);
      this.addMessage('User Logged In');
    } else {
      this.addMessage('User Not Logged In');

    }

  }


  clearMessages(): void {
    while (this.messages.length) {
      this.messages.pop();
    }
  }

  addMessage(msg: string): void {
    this.messages.push(msg);
  }

  addError(msg: string | any): void {
    this.messages.push('Error: ' + msg && msg.message);
  }

  public async onLogin(): Promise<void> {
    try {
      this.clearMessages();
      await this.authService.login();
    } catch (err) {
      this.addError(err);

    }
  }

  public async onRenewToken(): Promise<void> {
    try {
      this.clearMessages();
      const user = await this.authService.renewToken();
      this.currentUser = user;
      this.addMessage('Silent Renew Success');
    } catch (err) {
      this.addError(err);
    }
  }

  public async onLogout(): Promise<void> {
    this.clearMessages();
    try {
      this.authService.logout();
    } catch (err) {
      this.addError(err);
    }

  }
}
