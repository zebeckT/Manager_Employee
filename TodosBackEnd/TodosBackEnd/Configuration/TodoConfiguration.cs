using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TodosBackEnd.Models;

namespace TodosBackEnd.Configuration
{
    public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.ToTable("employees");
            builder.HasKey(t => t.Id);
            builder.Property(t => t.FullName).HasColumnName("full_name");
            builder.Property(t => t.Email).HasColumnName("email");
            builder.Property(t => t.Phone).HasColumnName("phone");
            builder.Property(t => t.Position).HasColumnName("position");

        }
    }
}
