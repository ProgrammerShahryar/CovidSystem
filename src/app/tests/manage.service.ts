import {Officer} from './manage.model';
import {TestCentre} from './manage.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ManageStock} from './manage.model';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable({providedIn: 'root'})

export class ManageService {
  private testCentre: TestCentre[] = [];
  private officer: Officer[] = [];
  private Stock: ManageStock[] = [];
  private stockUpdated = new Subject<ManageStock[]>();


  constructor(private http: HttpClient, private  router: Router) {}

  addTestCentre(centreName: string) {
    const testCentre: TestCentre = {id: null, centreName: centreName};
    this.http
      .post<{message: string}> ('http://localhost:3000/api/testCentres', testCentre)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.testCentre.push(testCentre);
      });
  }

  addOfficer(username: string, password: string, officerName: string){
    const officer: Officer = {id: null, username: username, password: password};
    this.http
      .post<{message: string}> ('http://localhost:3000/api/user', officer)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.officer.push(officer);
      });
  }

  addStock(stockName: string, stockNumber: string){
    const manageStock: ManageStock = {id: null, stockName: stockName, stockNumber: stockNumber};
    this.http
      .post<{message: string}> ('http://localhost:3000/api/stocks', manageStock)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.Stock.push(manageStock);
      });
  }
//update stock
  getStock(id: string){
    return{...this.Stock.find(t => t.id === id)};
  }

  updateStock(id: string, stockName: string, stockNumber: string){
    const stock: ManageStock = {id: id, stockName: stockName, stockNumber: stockNumber};
    this.http.put('http://localhost:3000/api/stocks/' + id, stock)
      .subscribe(response => console.log(response));
    this.router.navigate(['existStock']);
  }


  getStocks() {
    this.http.get<{message: string, Stock: any}>('http://localhost:3000/api/stocks')

      .pipe(map((stockData) => {
        return stockData.Stock.map(stock => {
          return {
            stockNumber: stock.stockNumber,
            stockName: stock.stockName,
            id: stock._id
          };
        });

      }))
      .subscribe((transformedStocks) => {
        this.Stock = transformedStocks;
        this.stockUpdated.next([...this.Stock]);
      })
  }

  getStockUpdateListener(){
    return this.stockUpdated.asObservable();
  }

}

