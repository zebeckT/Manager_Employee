using Microsoft.AspNetCore.Mvc;
using TodosBackEnd.Models;
using TodosBackEnd.Service.Employees;
using TodosBackEnd.Service.Todos;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TodosBackEnd.Controllers
{
    
    [Route("v1/api/employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeesService _employeesService;

        public EmployeesController(IEmployeesService employeesService)
        {
            _employeesService = employeesService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_employeesService.GetEmployees());
        }

        [HttpPost]
        public IActionResult Post(Employee employee)
        {
            return Ok(_employeesService.AddEmployee(employee));
        }

        [HttpPut]
        public IActionResult Put(Employee employee) 
        { 
            return Ok(_employeesService.UpdateEmployee(employee));
        }

        [HttpDelete ("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok(_employeesService.DeleteEmployee(id));
        }

    }
}
