using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TicketManagement_Backend.Enums;

namespace TicketManagement_Backend.Models
{
    public class Ticket
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TicketID { get; set; }

        public string Description { get; set; }

        [EnumDataType(typeof(TicketStatus))]
        public TicketStatus Status { get; set; }

        public DateTime Date { get; set; } =  DateTime.UtcNow;
    }
}
