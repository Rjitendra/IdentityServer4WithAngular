using Microsoft.EntityFrameworkCore;
using System;


namespace Bridgetree.Blazor.Models
{
   public class ApiContext: DbContext
    { 
    public ApiContext(DbContextOptions<ApiContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Employee> Employees { get; set; }
    public virtual DbSet<Department> Departments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        //Seed Departments Table
        modelBuilder.Entity<Department>().HasData(
            new Department { DepartmentId = 1, DepartmentName = "IT" });
        modelBuilder.Entity<Department>().HasData(
            new Department { DepartmentId = 2, DepartmentName = "HR" });
        modelBuilder.Entity<Department>().HasData(
            new Department { DepartmentId = 3, DepartmentName = "Payroll" });
        modelBuilder.Entity<Department>().HasData(
            new Department { DepartmentId = 4, DepartmentName = "Admin" });

            // Seed Employee Table

            modelBuilder.Entity<Employee>().HasData(new Employee
            {
                EmployeeId = 1,
                FirstName = "Joshua",
                LastName = "Stacy",
                Email = "JStacy@Bridgetree.com",
                DateOfBrith = new DateTime(1981, 12, 22),
                Gender = Gender.Male,
                DepartmentId = 1
            });

            modelBuilder.Entity<Employee>().HasData(new Employee
        {
            EmployeeId = 2,
            FirstName = "P",
            LastName = "Nishanth",
            Email = "PNishanth@Bridgetree.com",
            DateOfBrith = new DateTime(1981, 12, 22),
            Gender = Gender.Male,
            DepartmentId = 1
        });
        modelBuilder.Entity<Employee>().HasData(new Employee
        {
            EmployeeId = 3,
            FirstName = "Jitendra",
            LastName = "Behera",
            Email = "jbehera@Bridgetree.com",
            DateOfBrith = new DateTime(1990, 06, 7),
            Gender = Gender.Male,
            DepartmentId = 1
        });

    }
}
}
