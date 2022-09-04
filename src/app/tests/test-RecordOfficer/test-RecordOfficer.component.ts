import {Component, EventEmitter, Output,OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Officer} from '../manage.model';
import {ManageService} from '../manage.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
@Component({
  selector: 'app-test-update',
  templateUrl: './test-RecordOfficer.component.html',
  styleUrls: ['./test-RecordOfficer.component.css']
})

export class TestRecordOfficerComponent{
  officer: Officer;
  private mode ='record';
  private officerID : string;
  popup = false;
  hide = true;


  @Output() officersCreated = new EventEmitter<Officer>();

  constructor(public officerService: ManageService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.mode = 'record';
      this.officerID = null;
    });
  }


  onAddOfficer(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'record') {
      this.officerService.addOfficer(form.value.username, form.value.password, form.value.officerName);
      form.resetForm();
    }
  }



}
