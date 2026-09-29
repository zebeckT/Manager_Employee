using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TodosBackEnd.Data
{
    public class EmployeeDBContextFatory : IDesignTimeDbContextFactory<EmployeeDBContext>
    {
        public EmployeeDBContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("EmployeeDBConnection");

            var optionsBuilder = new DbContextOptionsBuilder<EmployeeDBContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new EmployeeDBContext(optionsBuilder.Options);
        }

    }
}
