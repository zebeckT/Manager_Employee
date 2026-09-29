using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TodosBackEnd.Configuration;
using TodosBackEnd.Models;
using TodosBackEnd.Seeders;

namespace TodosBackEnd.Data
{
    public class EmployeeDBContext: DbContext
    {
        public EmployeeDBContext(DbContextOptions<EmployeeDBContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EmployeeConfiguration());

            modelBuilder.Seed();
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
