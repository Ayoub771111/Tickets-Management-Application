using TicketManagement_Backend.Enums;

namespace TicketManagement_Backend.Dto
{
    public class CreateTicketDto
    {
        public string Description { get; set; }
        public TicketStatus Status { get; set; }
    }
}
