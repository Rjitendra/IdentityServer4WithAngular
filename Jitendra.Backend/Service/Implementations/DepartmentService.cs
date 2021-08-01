using Bridgetree.Blazor.Models;
using Bridgetree.Blazor.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Bridgetree.Blazor.Service.Implementations
{
    public class DepartmentService : IDepartmentService
    {
        private readonly ApiContext appDbContext;

        public DepartmentService(ApiContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task<Department> GetDepartment(int departmentId)
        {
            return await appDbContext.Departments
                .FirstOrDefaultAsync(d => d.DepartmentId == departmentId);
        }

        public async Task<IEnumerable<Department>> GetDepartments()
        {
            return await appDbContext.Departments.ToListAsync();
        }
    }
}
