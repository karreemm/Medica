using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataBaseProject.Migrations
{
    /// <inheritdoc />
    public partial class twoimages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "image2",
                table: "scan",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SurgeryUser",
                columns: table => new
                {
                    Nid = table.Column<int>(type: "integer", nullable: false),
                    Sid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurgeryUser", x => new { x.Nid, x.Sid });
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SurgeryUser");

            migrationBuilder.DropColumn(
                name: "image2",
                table: "scan");
        }
    }
}
