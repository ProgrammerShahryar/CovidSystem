import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { TestSelectComponent } from './tests/test-selection/test-selection.component';
import { SignUpComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { TestNewComponent } from './tests/test-new/test-new.component';
import { TestExistComponent } from './tests/test-exist/test-exist.component';
import { TestUpdateComponent } from './tests/test-update/test-update.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Navbar4Component } from './Navbar4/Navbar4.component';
import {TestNewStockComponent} from './tests/test-newStock/test-newStock.component';
import {TestExistStockComponent} from './tests/test-existStock/test-existStock.component';
import { TestManageComponent } from './tests/test-manage/test-manage.component';
import {TestUpdateStockComponent} from './tests/test-updateStock/test-updateStock.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestHistoryComponent } from './tests/test-history/test-history.component';
import { TestRecordOfficerComponent } from './tests/test-RecordOfficer/test-RecordOfficer.component';
import { TestReportComponent } from './tests/test-Report/test-Report.component';
import { TestRegisterComponent } from './tests/test-RegisterCentre/test-Register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptor} from './auth/auth-interceptor';


const appRoutes: Routes = [
  {path: 'select', component: TestSelectComponent},
  {path: 'new', component: TestNewComponent},
  {path: 'exist', component: TestExistComponent},
  {path: 'history', component: TestHistoryComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  {path: 'record', component: TestRecordOfficerComponent},
  {path: 'report', component: TestReportComponent},
  {path: 'register', component: TestRegisterComponent},
  {path: 'manage', component: TestManageComponent},
  {path: 'edit/:testId', component: TestNewComponent},
  {path: 'update/:testId', component: TestUpdateComponent},
  {path: "",  component: LoginComponent, pathMatch: "full"},
  {path: 'newStock', component: TestNewStockComponent},
  {path: 'existStock', component: TestExistStockComponent},
  {path: 'updateStock', component: TestExistStockComponent},
  {path: 'updateStockList/:stockId', component: TestUpdateStockComponent}

];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TestSelectComponent,
    TestNewComponent,
    TestExistComponent,
    TestUpdateComponent,
    TestHistoryComponent,
    SignUpComponent,
    LoginComponent,
    TestRecordOfficerComponent,
    TestReportComponent,
    Navbar4Component,
    NavbarComponent,
    TestRegisterComponent,
    TestManageComponent,
    TestNewStockComponent,
    TestExistStockComponent,
    TestUpdateStockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    NgbModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
