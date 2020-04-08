import {Component, OnInit, TemplateRef} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  createContactDto: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.createContactDto = this.fb.group({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      title: new FormControl(null, [Validators.required, Validators.minLength(4),
        Validators.maxLength(100)]),
      message: new FormControl(null, Validators.required),
    });
  }

  openDialog(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  hideDialog() {
    this.dialog.closeAll();
  }

  onSubmit(template: TemplateRef<any>) {
    this.authService.messageContact(this.createContactDto.value)
      .subscribe(() => {
        this.openSnackBar('Message Sent Successfully!', 'OK');
        this.openDialog(template);
      })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
