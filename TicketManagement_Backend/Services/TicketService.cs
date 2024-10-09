using TicketManagement_Backend.Dto;
using TicketManagement_Backend.Models;
using TicketManagement_Backend.Repositories;

namespace TicketManagement_Backend.Services
{
   

    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _repository;

        public TicketService(ITicketRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Ticket>> GetTicketsAsync(int page, int pageSize)
        {
            return await _repository.GetTicketsAsync(page, pageSize);
        }

        public async Task<Ticket?> GetTicketByIdAsync(int id)
        {
            return await _repository.GetTicketByIdAsync(id);
        }

        public async Task<Ticket> CreateTicketAsync(CreateTicketDto createTicketDto)
        {
            var ticket = new Ticket
            {
                Description = createTicketDto.Description,
                Status = createTicketDto.Status,
            };

            return await _repository.AddTicketAsync(ticket);
        }

        public async Task UpdateTicketAsync(int id, UpdateTicketDto updateTicketDto)
        {
            if (!await _repository.TicketExistsAsync(id))
            {
                throw new KeyNotFoundException("Ticket not found");
            }

            var ticket = new Ticket
            {
                TicketID = id, 
                Description = updateTicketDto.Description,
                Status = updateTicketDto.Status
            };

            await _repository.UpdateTicketAsync(ticket);
        }


        public async Task DeleteTicketAsync(int id)
        {
            if (!await _repository.TicketExistsAsync(id))
            {
                throw new KeyNotFoundException("Ticket not found");
            }

            await _repository.DeleteTicketAsync(id);
        }
    }
}
