import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageCategoriesComponent} from "./components/manage-categories/manage-categories.component";
import {ManageOrdersComponent} from "./components/manage-orders/manage-orders.component";
import {ManageUsersComponent} from './components/manage-users/manage-users.component';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AdminRoutingModule} from "./admin-routing.module";


@NgModule({
  declarations: [DashboardComponent, ManageCategoriesComponent, ManageOrdersComponent, ManageUsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule {
}
