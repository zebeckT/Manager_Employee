using TodosBackEnd.Service.Employees;
using TodosBackEnd.Models;
using TodosBackEnd.Data;

namespace TodosBackEnd.Service.Todos
{
    public class EmployeesService : IEmployeesService

    {
        private readonly EmployeeDBContext _employeeDBContext;

        public EmployeesService(EmployeeDBContext employeeDBContext)
        {
            _employeeDBContext = employeeDBContext;
        }

        public bool AddEmployee(Employee employee)
        {
            _employeeDBContext.Employees.Add(employee);
            _employeeDBContext.SaveChanges();
            return true;
        }

        public bool DeleteEmployee(int id)
        {
            Employee employee = _employeeDBContext.Employees.Find(id);
            _employeeDBContext.Employees.Remove(employee);
            _employeeDBContext.SaveChanges();
            return true;
        }

        public List<Employee> GetEmployees()
        {
            return _employeeDBContext.Employees.OrderBy(e => e.Id).ToList();
        }

        public bool UpdateEmployee(Employee employee)
        {
            _employeeDBContext.Employees.Update(employee);
            _employeeDBContext.SaveChanges();
            return true;
        }
    }
}
