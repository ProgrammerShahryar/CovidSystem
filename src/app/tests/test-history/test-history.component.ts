import {Component, OnInit} from '@angular/core';
import {Test} from '../test.model';
import {TestService} from '../test.service';
import { Subscription } from 'rxjs';

@Component({
  selector:'app-test-history',
  templateUrl:'./test-history.component.html',
  styleUrls:['./test-history.component.css']
})

export class TestHistoryComponent{
  private testsSub: Subscription;
  tests: Test[] = [];

  constructor(public testsService: TestService) {
  }

  ngOnInit() {
    this.testsService.getTests();
    this.testsSub = this.testsService.getTestsUpdateListener()
      .subscribe((tests: Test[]) => {
        this.tests = tests;
      });
  }
}
