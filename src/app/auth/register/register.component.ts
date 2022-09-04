import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class SignUpComponent{
  constructor(public AuthService: AuthService) {}
  popup = false;
  hide = true;

  onRegister(form: NgForm){
    if (form.invalid){
      this.popup = false;
      return;
    }
    this.popup = true;
    this.AuthService.createUser(form.value.username, form.value.password);
  }
}
