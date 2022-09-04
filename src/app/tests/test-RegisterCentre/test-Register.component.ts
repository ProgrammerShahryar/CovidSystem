import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {TestCentre} from '../manage.model';
import {ManageService} from '../manage.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-test-RegisterCentre',
  templateUrl: './test-Register.component.html',
  styleUrls: ['./test-Register.component.css']
})

export class TestRegisterComponent {
  testCentre: TestCentre;
  private mode = 'register';
  private testCentreID: string;
  popup = false;
  hide = true;

  @Output() testCentreCreated = new EventEmitter<TestCentre>();

  constructor(public manageService: ManageService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.mode = 'register';
      this.testCentreID = null;
    });
  }

  onAddTestCentre(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'register') {
      this.manageService.addTestCentre(form.value.centreName);
    }
    form.resetForm();
  }
}
