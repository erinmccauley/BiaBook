import { HostListener, Component, OnInit } from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../Services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  public currentWindowWidth: number;
  faBars = faBars;
  isLoggedIn: boolean;

  constructor(public accountService: AccountService) { }


  ngOnInit() {
    this.currentWindowWidth = window.innerWidth;
  }
  @HostListener('window:resize')
onResize() {
this.currentWindowWidth = window.innerWidth;
}

logout() {
  console.log('test');
  this.accountService.deleteToken();
}

}





