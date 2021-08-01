import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { EmployeeEditComponent } from './component/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { EmployeeService } from './service/employee.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { LayoutComponent } from './component/layout/layout.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { AuthInterceptorService } from './shared/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    LayoutComponent,
    NotFoundComponent
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    TableModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
