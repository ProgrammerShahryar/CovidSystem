import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Test} from '../test.model';
import {TestService} from '../test.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector:'app-test-new',
  templateUrl:'./test-new.component.html',
  styleUrls:['./test-new.component.css']
})

export class TestNewComponent{
  test: Test;
  private mode = 'new';
  private testId: string;
  popup = false;
  hide = true;
  status: string;
  pDate = new Date().toLocaleDateString();
  rDate = new Date().toLocaleDateString();
  result: string;

  @Output() testsCreated = new EventEmitter<Test>();

  constructor(public testService: TestService, public route: ActivatedRoute) {}

  ngOnInit() {
    formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.rDate = 'null';
    this.status = 'pending';
    this.result = 'null';
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('testId')) {
        this.mode = 'edit';
        this.testId = paramMap.get('testId');
        this.test = this.testService.getTest(this.testId);
      } else {
        this.mode = 'new';
        this.testId = null;
      }
  });
}

  onSavePost(form: NgForm){
    if(form.invalid){
      return;
    }
    if (this.mode === 'new'){
      this.testService.addTest(form.value.username, form.value.password, form.value.name, form.value.condition, form.value.symptoms, this.pDate, this.rDate, this.result, this.status);
    }else{
      this.testService.updateTest(this.testId, form.value.username, form.value.password, form.value.name, form.value.condition, form.value.symptoms, this.pDate, this.rDate, this.result, this.status);
    }

    form.resetForm();
  }

  onAddTest(form: NgForm){
    if (form.invalid){
      this.popup = false;
      return;
    }
    this.popup = true;
    this.testService.addTest(form.value.username, form.value.password, form.value.name, form.value.condition, form.value.symptoms, this.pDate, this.rDate, this.result, this.status);
    form.resetForm();
  }
}
