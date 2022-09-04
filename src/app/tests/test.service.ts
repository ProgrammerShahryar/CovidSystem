import {Test} from './test.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})


export class TestService {
 private tests: Test[] = [];
 private testsUpdated = new Subject<Test[]>();

 constructor(private http:HttpClient, private router: Router) {}

getTest(id: string){
  return{...this.tests.find(t => t.id === id)};
}

updateTest(id: string, username: string, password: string, name: string, condition: string, symptoms: string, proposedDate: string, resultDate: string, result: string, status: string){
  const test: Test = {id: id, username: username, password: password, name: name, condition: condition, symptoms: symptoms, proposedDate: proposedDate, resultDate: resultDate, result: result, status: status};
  this.http.put('http://localhost:3000/api/tests/' + id, test)
  .subscribe(response => console.log(response));
  this.router.navigate(['select']);
}

deleteTest(testId: string){
  this.http.delete('http://localhost:3000/api/tests/' + testId)
  .subscribe(() => {
    const updatedTests = this.tests.filter(test => test.id !== testId);
      this.tests = updatedTests;
      this.testsUpdated.next([...this.tests]);
  });
}

getTests() {
  this.http.get<{message: string, tests: any}>('http://localhost:3000/api/tests')

    .pipe(map((testData) => {
      return testData.tests.map(test => {
        return {
          username: test.username,
          password: test.password,
          name: test.name,
          condition: test.condition,
          symptoms: test.symptoms,
          proposedDate: test.proposedDate,
          resultDate: test.resultDate,
          result: test.result,
          status: test.status,
          id: test._id
        };
      });

    }))
    .subscribe((transformedTests) => {
      this.tests = transformedTests;
      this.testsUpdated.next([...this.tests]);
    })
}

getTestsUpdateListener(){
  return this.testsUpdated.asObservable();
}

addTest(username: string, password: string, name: string, condition: string, symptoms: string, proposedDate: string, resultDate: string, result: string, status: string) {
  const test: Test = {id: null, username: username, password: password, name: name, condition: condition, symptoms: symptoms, proposedDate: proposedDate, resultDate: resultDate, result: result, status: status};
  this.http
  .post<{message:string}> ('http://localhost:3000/api/tests', test)
  .subscribe((responseData) => {
    console.log(responseData.message);
    this.tests.push(test);
    this.testsUpdated.next([...this.tests]);
    this.router.navigate(['select']);
  });
}
}
