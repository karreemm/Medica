using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataBaseProject.Migrations
{
	/// <inheritdoc />
	public partial class nid : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropColumn(
				name: "Nid",
				table: "surgery"
				);
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AddColumn<int>(
				name: "Nid",
				type: "int",
				table: "surgery"
			);

		}
	}
}
