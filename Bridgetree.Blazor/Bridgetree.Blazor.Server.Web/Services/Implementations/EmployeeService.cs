using Bridgetree.Blazor.Models;
using Bridgetree.Blazor.Server.Web.Services.Interfaces;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Bridgetree.Blazor.Server.Web.Services.Implementations
{
    public class EmployeeService : IEmployeeService
    {
        private readonly HttpClient httpClient;

        public EmployeeService(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }
        public async Task<Employee> CreateEmployee(Employee newEmployee)
        {
            return await httpClient.PostJsonAsync<Employee>("api/employee", newEmployee);
        }

        public async Task DeleteEmployee(int id)
        {
            await httpClient.DeleteAsync($"api/employee/{id}");
        }

        public async Task<Employee> GetEmployee(int id)
        {
            return await httpClient.GetJsonAsync<Employee>($"api/employee/{id}");
        }

        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            try
            {
                return await httpClient.GetJsonAsync<Employee[]>("api/Employee");
            }
            catch (Exception ex) { throw ex; }
        }

        public async Task<Employee> UpdateEmployee(Employee updatedEmployee)
        {
            return await httpClient.PutJsonAsync<Employee>("api/employee", updatedEmployee);
        }
    }
}
