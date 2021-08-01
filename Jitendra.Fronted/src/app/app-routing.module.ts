import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeEditComponent } from './component/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { HomeComponent } from './component/home/home.component';
import { LayoutComponent } from './component/layout/layout.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { SigninRedirectCallbackComponent } from './shared/signin-redirect-callback/signin-redirect-callback.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '', canActivate: [AuthGuardService],
        children: [
          { path: '', component: HomeComponent },
          { path: 'emp-list', component: EmployeeListComponent },
          { path: 'emp-add', component: EmployeeEditComponent },
          { path: 'emp-edit/:id', component: EmployeeEditComponent }

        ]
      }
    ],
  },
  { path: 'signin-callback', component: SigninRedirectCallbackComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
