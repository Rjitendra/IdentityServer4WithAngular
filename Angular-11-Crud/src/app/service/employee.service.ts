import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../model/emp';

export abstract class ServiceBase {

    constructor(protected http: HttpClient) {
    }
    protected toApiUrl(uri: any): any {
        return `${environment.apiBaseUrl}${uri}`;
    }
}



@Injectable({
    providedIn: 'root'
})
export class EmployeeService extends ServiceBase {

    constructor(http: HttpClient) { super(http); }

    // tslint:disable-next-line:typedef
    getAllEmployee() {
        return this.http.get<any>(this.toApiUrl('Employee'));
    }

    // tslint:disable-next-line:typedef
    deleteEmployee(employeeId: number) {
        return this.http.delete<any>(this.toApiUrl('Employee' + `/${employeeId}`));
    }

    // tslint:disable-next-line:typedef
    editEmployee(id: number) {
        return this.http.get<any>(this.toApiUrl('Employee') + `/${id}`);
    }

    // tslint:disable-next-line:typedef
    updateEmployee(param: Employee) {
        return this.http.put<any>(this.toApiUrl('Employee'), param);
    }

    // tslint:disable-next-line:typedef
    createEmployee(param: Employee) {
        return this.http.post<any>(this.toApiUrl('Employee'), param);
    }


}


