import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-usersadmin',
  templateUrl: './usersadmin.component.html',
  styleUrls: ['./usersadmin.component.css']
})
export class UsersadminComponent implements OnInit {  users: User[] = [];

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers(): Promise<void> {
    this.users = await this.userService.getAll().toPromise();
  }

  async deleteRecipe(userId, userName) {
    if (confirm('Do you want to delete ' + userId + ': ' + userName)) {
      await this.userService.delete(userId);
      this.getUsers();
    }

  }


  trackByFn(index, item) {
    return index;
  }
}