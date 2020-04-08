import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../../services/cart/cart.service";
import {AlertService} from "../../../services/alert/alert.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // we will use reactive forms
  authCredentialsDto: FormGroup;
  modalRef: BsModalRef;
  showPass = true;
  @ViewChild('invalidCredentials', {static: true}) invCredentials: TemplateRef<any>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private modalService: BsModalService,
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  userLogin() {
    this.authService.login(this.authCredentialsDto.value).subscribe(
      res => {
        localStorage.setItem("token", res.accessToken);
        this.authService.prepareUserData();
        this.router.navigate([`/home`]);
      },
      error => {
        this.alertService.error(error);
        this.openModal(this.invCredentials);
      }
    );
  }

  ngOnInit() {
    this.authCredentialsDto = this.fb.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  hide(): void {
    this.modalRef.hide();
  }
}
