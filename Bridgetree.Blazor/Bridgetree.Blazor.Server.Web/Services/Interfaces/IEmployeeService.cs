
using Bridgetree.Blazor.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bridgetree.Blazor.Server.Web.Services.Interfaces
{
    public interface IEmployeeService
    {
        Task<IEnumerable<Employee>> GetEmployees();
        Task<Employee> GetEmployee(int id);
        Task<Employee> UpdateEmployee(Employee updatedEmployee);
        Task<Employee> CreateEmployee(Employee newEmployee);
        Task DeleteEmployee(int id);

    }
}
