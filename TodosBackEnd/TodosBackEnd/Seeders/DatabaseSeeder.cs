using Microsoft.EntityFrameworkCore;
using TodosBackEnd.Models;

namespace TodosBackEnd.Seeders
{
    public static class DatabaseSeeder
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().HasData(
                new Employee
                {
                    Id = 1,
                    FullName = "Nguyen Van A",
                    Email = "nguyenvana@gmail.com",
                    Phone = "3941596969",
                    Position = "Software Engineer"
                },
                new Employee
                {
                    Id = 2,
                    FullName = "Nguyen Van B",
                    Email = "nguyenvanb@gmail.com",
                    Phone = "8419595895",
                    Position = "Product Manager"
                },
                new Employee
                {
                    Id = 3,
                    FullName = "Nguyen Van C",
                    Email = "nguyenvanc@gmail.com",
                    Phone = "81381858558",
                    Position = "UX Designer"
                }
            );
        }
    }
}
