using Bridgetree.Blazor.Models;
using Bridgetree.Blazor.Server.Web.Services.Interfaces;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bridgetree.Blazor.Server.Web.Pages
{
    public class EmployeesListBase : ComponentBase
    {
        [Inject]
        public IEmployeeService EmployeeService { get; set; }

        public IEnumerable<Employee> Employees { get; set; }

        protected override async Task OnInitializedAsync()
        {
            Employees = (await EmployeeService.GetEmployees()).ToList();
        }


        protected int SelectedEmployeesCount { get; set; } = 0;

        protected void EmployeeSelectionChanged(int countValue)
        {

            SelectedEmployeesCount = countValue;


        }
        protected async Task EmployeeDeleted(int employeeId)
        {
            Employees = (await EmployeeService.GetEmployees()).ToList();
        }
    }
}