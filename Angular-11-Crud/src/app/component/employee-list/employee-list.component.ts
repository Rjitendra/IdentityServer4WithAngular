import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/model/emp';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employee: IEmployee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployee().subscribe((res => {
      this.employee = res;
    }));
  }
  deleteUser(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe((res => {
      this.employee = this.employee.filter(x => x.employeeId !== employeeId);
    }));

  }
  getGender(gender) {
    switch (gender) {
      case 1:
        return 'Male';

      case 2:
        return 'Female';


      default:
        return 'Other';
    }

  }
}
