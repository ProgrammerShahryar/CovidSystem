import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Test} from '../test.model';
import {TestService} from '../test.service';
import { Subscription } from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
  selector:'app-test-exist',
  templateUrl:'./test-exist.component.html',
  styleUrls:['./test-exist.component.css']
})

export class TestExistComponent implements OnInit, OnDestroy{

  tests: Test[] = [];
  private testsSub: Subscription;

  constructor(public testsService: TestService) {
  }

  ngOnInit() {
    this.testsService.getTests();
    this.testsSub = this.testsService.getTestsUpdateListener()
    .subscribe((tests: Test[]) =>{
    this.tests = tests;
  });
}

  onDelete(testId: string) {
    this.testsService.deleteTest(testId);
  }

  ngOnDestroy(){
    this.testsSub.unsubscribe();
  }
}
