using Bridgetree.Blazor.Models;
using Bridgetree.Blazor.Server.Web.Services.Interfaces;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bridgetree.Blazor.Server.Web.Pages
{
    public class DisplayEmployeeBase : ComponentBase
    {
        [Parameter]
        public EventCallback<int> OnEmployeeDeleted { get; set; }

        [Inject]
        public IEmployeeService EmployeeService { get; set; }

        [Inject]
        public NavigationManager NavigationManager { get; set; }


        [Parameter]
        public IEnumerable<Employee> Employees { get; set; }

        [Parameter]
        public EventCallback<int> OnEmployeeSelection { get; set; }

        protected ConfirmBase DeleteConfirmation { get; set; }

        public int EmployeeId { get; set; }

        public string FirstName { get; set; }


        protected async Task OnChanged()
        {
            currentCount++;
            await OnEmployeeSelection.InvokeAsync(currentCount);
        }
        private int currentCount = 0;
        protected void Delete(int employeeId, string firstName)
        {
            this.EmployeeId = employeeId;
            this.FirstName = firstName;
            DeleteConfirmation.Show();



        }
        protected async Task ConfirmDelete(bool deleteConfirmed)
        {
            if (deleteConfirmed)
            {
                await EmployeeService.DeleteEmployee(this.EmployeeId);
                await OnEmployeeDeleted.InvokeAsync(this.EmployeeId);
            }


        }
    }
}
