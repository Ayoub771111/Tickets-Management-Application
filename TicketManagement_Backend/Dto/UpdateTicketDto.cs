using TicketManagement_Backend.Enums;

namespace TicketManagement_Backend.Dto
{
    public class UpdateTicketDto
    {
        public string Description { get; set; }
        public TicketStatus Status { get; set; }
    }
}
