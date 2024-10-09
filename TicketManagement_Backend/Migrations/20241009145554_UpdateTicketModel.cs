using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TicketManagement_Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTicketModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TicketId",
                table: "Tickets",
                newName: "TicketID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TicketID",
                table: "Tickets",
                newName: "TicketId");
        }
    }
}
