using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataBaseProject.Migrations
{
    /// <inheritdoc />
    public partial class edit2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "duration",
                table: "surgery");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "duration",
                table: "surgery",
                type: "real",
                nullable: true);
        }
    }
}
