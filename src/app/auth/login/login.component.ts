import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector:'app-login',
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.css']
})

export class LoginComponent{
  constructor(public authService: AuthService) { }
  popup = false;
  hide = true;

  onLogin(form: NgForm){
    if (form.invalid){
      this.popup = false;
      return;
    }
    this.authService.login(form.value.username, form.value.password);
}
}
