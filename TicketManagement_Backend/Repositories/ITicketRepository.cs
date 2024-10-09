using TicketManagement_Backend.Models;

namespace TicketManagement_Backend.Repositories
{
    public interface ITicketRepository
    {
        Task<IEnumerable<Ticket>> GetTicketsAsync(int page, int pageSize);
        Task<Ticket?> GetTicketByIdAsync(int id);
        Task<Ticket> AddTicketAsync(Ticket ticket);
        Task UpdateTicketAsync(Ticket ticket);
        Task DeleteTicketAsync(int id);
        Task<bool> TicketExistsAsync(int id);
    }
}
