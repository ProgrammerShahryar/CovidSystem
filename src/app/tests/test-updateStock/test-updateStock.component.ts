import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';
import {Test} from '../test.model';
import {ManageStock} from '../manage.model';
import {ManageService} from '../manage.service';
import {TestService} from '../test.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector:'app-test-updateStock',
  templateUrl:'./test-updateStock.component.html',
  styleUrls:['./test-updateStock.component.css']
})

export class TestUpdateStockComponent{
  popup = false;
  hide = true;
  status: string;
  private mode = 'updateStockList';
  stock: ManageStock;
  private stockId: string;
  constructor(public manageService: ManageService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('stockId')) {
        this.mode = 'updateStockList';
        this.stockId = paramMap.get('stockId');
        this.stock = this.manageService.getStock(this.stockId);
      }
  });
}

  onSaveTest(form: NgForm){
    if(form.invalid){
      return;
    }
    if (this.mode === 'updateStockList'){
      this.manageService.updateStock(this.stockId, form.value.stockName, form.value.stockNumber);
    }

    form.resetForm();
  }


}
