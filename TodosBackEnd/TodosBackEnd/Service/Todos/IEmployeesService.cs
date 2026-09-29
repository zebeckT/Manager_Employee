using TodosBackEnd.Models;

namespace TodosBackEnd.Service.Employees
{
    public interface IEmployeesService
    {
        List<Employee> GetEmployees();
        Boolean AddEmployee(Employee employee);
        Boolean UpdateEmployee(Employee employee);
        Boolean DeleteEmployee(int id);
    }
}
