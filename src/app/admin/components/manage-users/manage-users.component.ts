import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {AdminService} from "../../admin.service";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: Array<User> = new Array<User>();
  admins: Array<User> = new Array<User>();

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getSystemUsers().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].isAdmin) {
          this.admins.push(res[i]);
        } else {
          this.users.push(res[i]);
        }
      }
    }, error => console.error(error));
  }

}
