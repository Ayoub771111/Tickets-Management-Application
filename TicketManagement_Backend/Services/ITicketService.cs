using TicketManagement_Backend.Dto;
using TicketManagement_Backend.Models;

namespace TicketManagement_Backend.Services
{
    public interface ITicketService
    {
        Task<IEnumerable<Ticket>> GetTicketsAsync(int page, int pageSize);
        Task<Ticket?> GetTicketByIdAsync(int id);
        Task<Ticket> CreateTicketAsync(CreateTicketDto createTicketDto); 
        Task UpdateTicketAsync(int id, UpdateTicketDto updateTicketDto); 
        Task DeleteTicketAsync(int id);
    }
}
