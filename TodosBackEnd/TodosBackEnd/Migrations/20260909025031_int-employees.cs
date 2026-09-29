using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TodosBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class intemployees : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    full_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    position = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employees", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "employees",
                columns: new[] { "Id", "email", "full_name", "phone", "position" },
                values: new object[,]
                {
                    { 1, "nguyenvana@gmail.com", "Nguyen Van A", "3941596969", "Software Engineer" },
                    { 2, "nguyenvanb@gmail.com", "Nguyen Van B", "8419595895", "Product Manager" },
                    { 3, "nguyenvanc@gmail.com", "Nguyen Van C", "81381858558", "UX Designer" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "employees");
        }
    }
}
