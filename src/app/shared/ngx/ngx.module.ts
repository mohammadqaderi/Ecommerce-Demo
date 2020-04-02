import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AccordionModule,
  CarouselModule,
  ModalModule,
  PaginationModule,
  PopoverModule,
  TooltipModule
} from "ngx-bootstrap";

const ngxComponents = [
  CarouselModule.forRoot(),
  TooltipModule.forRoot(),
  ModalModule.forRoot(),
  PopoverModule.forRoot(),
  AccordionModule.forRoot(),
  PaginationModule.forRoot(),
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ngxComponents
  ]
})
export class NgxModule {
}
