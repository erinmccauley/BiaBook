import { Component } from '@angular/core';
import { AccountService } from './Services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginbtn:boolean;
  logoutbtn:boolean;
  title = 'BiaBook';

constructor(private accountService: AccountService){
  accountService.getLoggedInName.subscribe(name => this.changeName(name));
  if(this.accountService.isLoggedIn())
  {
  console.log("loggedin");
  this.loginbtn=false;
  this.logoutbtn=true
  }
  else{
  this.loginbtn=true;
  this.logoutbtn=false
  }
}

private changeName(name: boolean): void {
  this.logoutbtn = name;
  this.loginbtn = !name;
  }
  logout()
  {
  this.accountService.deleteToken();
  window.location.href = window.location.href;
  }
}
