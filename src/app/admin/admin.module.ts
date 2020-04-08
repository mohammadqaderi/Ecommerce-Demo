import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageCategoriesComponent} from "./components/manage-categories/manage-categories.component";
import {ManageOrdersComponent} from "./components/manage-orders/manage-orders.component";
import {ManageUsersComponent} from './components/manage-users/manage-users.component';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {MaterialModule} from "../shared/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FilesModule} from "../shared/files/files.module";
import {
  AccordionModule,
  CarouselModule,
  ModalModule,
  PaginationModule,
  PopoverModule,
  TooltipModule
} from "ngx-bootstrap";


@NgModule({
  declarations: [DashboardComponent, ManageCategoriesComponent, ManageOrdersComponent, ManageUsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FilesModule,
    CarouselModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    AccordionModule.forRoot(),
    PaginationModule.forRoot(),
  ]
})
export class AdminModule {
}
