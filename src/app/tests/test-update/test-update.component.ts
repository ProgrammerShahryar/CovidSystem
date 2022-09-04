import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';
import {Test} from '../test.model';
import {TestService} from '../test.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector:'app-test-update',
  templateUrl:'./test-update.component.html',
  styleUrls:['./test-update.component.css']
})

export class TestUpdateComponent{
  popup = false;
  hide = true;
  status: string;
  pDate = new Date().toLocaleDateString();
  rDate = new Date().toLocaleDateString();
  private mode = 'update';
  test: Test;
  private testId: string;
  constructor(public testService: TestService, public route: ActivatedRoute) {}

  ngOnInit() {
    formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.status = 'complete';
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('testId')) {
        this.mode = 'update';
        this.testId = paramMap.get('testId');
        this.test = this.testService.getTest(this.testId);
      }
  });
}

  onSaveTest(form: NgForm){
    if(form.invalid){
      return;
    }
    if (this.mode === 'update'){
      this.testService.updateTest(this.testId, form.value.username, form.value.password, form.value.name, form.value.condition, form.value.symptoms, this.pDate, this.rDate, form.value.result, this.status);
    }

    form.resetForm();
  }


}
