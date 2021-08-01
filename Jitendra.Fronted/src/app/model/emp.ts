export interface IEmployee {
    employeeId: number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBrith: Date;
    gender: Gender;
    departmentId: number;
    department: Department;


}



export class Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBrith: Date;
    gender: Gender;
    departmentId: number;
    department: Department;
    constructor(employee: IEmployee) {
        this.employeeId = employee.employeeId;
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.email = employee.email;
        this.dateOfBrith = employee.dateOfBrith;
        this.gender = employee.gender;
        this.departmentId = employee.departmentId;
        this.department = employee.department;
    }


}

export enum Gender {
    Male,
    Female,
    Other
}
export class Department {
    departmentId: number;
    departmentName: string;
}
