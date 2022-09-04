import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {ManageService} from '../manage.service';
import {ManageStock} from '../manage.model';


@Component({
  selector: 'app-test-newStock',
  templateUrl: './test-newStock.component.html',
  styleUrls: ['./test-newStock.component.css']
})

export class TestNewStockComponent{
  manageStock: ManageStock;
  private mode = 'newStock';
  private stockID: string;
  popup = false;
  hide = true;

  @Output() stockCreated = new EventEmitter<ManageStock>();

  constructor(public manageService: ManageService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('stockID')){
        this.mode = 'edit';
        this.stockID = paramMap.get('stockID');
        this.manageStock =this.manageService.getStock(this.stockID);
      }else {
        this.mode = 'newStock';
        this.stockID = null;
      }
    });
  }

  onAddStock(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'newStock') {
      this.manageService.addStock(form.value.stockName, form.value.stockNumber);
    }else {
      this.manageService.updateStock(this.stockID, form.value.stockName, form.value.stockNumber);
    }
    form.resetForm();
  }
}
