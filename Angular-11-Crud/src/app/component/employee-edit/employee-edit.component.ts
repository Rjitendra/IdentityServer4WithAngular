import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, IEmployee } from 'src/app/model/emp';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  employee: IEmployee;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService

  ) {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (this.isAddMode) {

      const obj: IEmployee = {

        employeeId: 0,
        firstName: '',
        lastName: '',
        email: '',
        gender: null,
        departmentId: null,
        department: null,
        dateOfBrith: null

      };
      this.employee = new Employee(obj);
      this.initilizeform();
    } else {

      this.employeeService.editEmployee(this.id).subscribe((res => {

        this.employee = res;
        this.initilizeform();
      }));
    }
  }
  // tslint:disable-next-line:typedef
  initilizeform() {


    this.form = this.formBuilder.group({
      firstNameCtrl: [this.employee.firstName, Validators.required],
      lastNameCtrl: [this.employee.lastName, Validators.required],
      genderCtrl: [this.employee.gender, Validators.required],
      departmentCtrl: [this.employee.departmentId, Validators.required],
      dateOfBirthCtrl: [this.getDate(this.employee.dateOfBrith), Validators.required],
      emailCtrl: [this.employee.email, [Validators.required, Validators.pattern('[a-z0-9.@]*')]]
    });
  }

  ngOnInit(): void {

  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get f() { return this.form.controls; }

  // tslint:disable-next-line:typedef
  getDate(datee: Date) {
    if (!datee) { return null; }
    const date = new Date(datee);
    const datestring = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    return datestring;
  }

  onSubmit(): void {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    }
    else {
      this.updateUser();

    }
  }

  mapToObjectCreate(): void {
    const obj: IEmployee = {

      employeeId: 0,
      firstName: this.form.value.firstNameCtrl,
      lastName: this.form.value.lastNameCtrl,
      email: this.form.value.emailCtrl,
      gender: +this.form.value.genderCtrl,
      departmentId: +this.form.value.departmentCtrl,
      department: null,
      dateOfBrith: new Date(this.form.value.dateOfBirthCtrl)

    };
    this.employee = new Employee(obj);

  }

  mapToObjectUpdate(): void {
    const obj: IEmployee = {

      employeeId: this.employee.employeeId,
      firstName: this.form.value.firstNameCtrl,
      lastName: this.form.value.lastNameCtrl,
      email: this.form.value.emailCtrl,
      gender: +this.form.value.genderCtrl,
      departmentId: +this.form.value.departmentCtrl,
      department: null,
      dateOfBrith: new Date(this.form.value.dateOfBirthCtrl)

    };
    this.employee = new Employee(obj);

  }

  private createUser(): void {
    this.mapToObjectCreate();
    this.employeeService.createEmployee(this.employee)
      .subscribe(() => {
        this.router.navigate(['emp-list']);
      })
      .add(() => this.loading = false);
  }

  private updateUser(): void {
    this.mapToObjectUpdate();
    this.employeeService.updateEmployee(this.employee)
      .subscribe(() => {
        this.router.navigate(['emp-list']);
      })
      .add(() => this.loading = false);
  }
}


