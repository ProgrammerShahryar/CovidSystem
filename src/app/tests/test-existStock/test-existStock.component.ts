import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ManageStock} from '../manage.model';
import { Subscription } from 'rxjs';
import {NgForm} from '@angular/forms';
import {ManageService} from '../manage.service';

@Component({
  selector:'app-test-existStock',
  templateUrl: './test-existStock.component.html',
  styleUrls:['./test-existStock.component.css']
})

export class TestExistStockComponent implements OnInit, OnDestroy{

  stocks: ManageStock[] = [];
  private stocksSub: Subscription;

  constructor(public manageService: ManageService) {
  }

  ngOnInit() {
    this.manageService.getStocks();
    this.stocksSub = this.manageService.getStockUpdateListener()
    .subscribe((stocks: ManageStock[]) => {
    this.stocks = stocks;
  });
  }

  ngOnDestroy(){
    this.stocksSub.unsubscribe();
  }
}
