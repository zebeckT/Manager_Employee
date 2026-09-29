using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TodosBackEnd.Data;
using TodosBackEnd.Service.Employees;
using TodosBackEnd.Service.Todos;
//using TodosBackEnd.Service.Todos;

var builder = WebApplication.CreateBuilder(args);

// Add Controller
builder.Services.AddControllers();

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<IEmployeesService, EmployeesService>();

builder.Services.AddDbContext<EmployeeDBContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("EmployeeDBConnection"));
});

var app = builder.Build();

// Enable Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors(builder =>
{
    builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();   
}
);

app.UseAuthorization();

app.MapControllers();

app.Run();