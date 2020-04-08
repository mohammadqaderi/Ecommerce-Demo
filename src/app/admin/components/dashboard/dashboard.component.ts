import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../admin.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  availableData = {
    totalUsers: 0,
    totalOrders: 0,
    totalPayments: 0,
    totalInvoices: 0,
  };

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getExistData()
      .subscribe(res => {
        this.availableData = res;
      })
  }

}
