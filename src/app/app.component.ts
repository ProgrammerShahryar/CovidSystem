import { Component } from '@angular/core';
import {Test} from './tests/test.model';
import {Officer} from './tests/manage.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedTests: Test[] = [];
  storedOfficer: Officer[] = [];

 onTestAdded(test){
  this.storedTests.push(test);

}
  onOfficerAdded(officer){
    this.storedOfficer.push(officer);
  }
}
