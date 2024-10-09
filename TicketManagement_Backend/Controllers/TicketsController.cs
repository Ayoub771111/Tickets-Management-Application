using Microsoft.AspNetCore.Mvc;
using TicketManagement_Backend.Dto;
using TicketManagement_Backend.Models;
using TicketManagement_Backend.Services;

namespace TicketManagement_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketService _ticketService;

        public TicketsController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets(int page = 1, int pageSize = 10)
        {
            var tickets = await _ticketService.GetTicketsAsync(page, pageSize);
            return Ok(tickets);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await _ticketService.GetTicketByIdAsync(id);

            if (ticket == null)
            {
                return NotFound();
            }

            return Ok(ticket);
        }
        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(CreateTicketDto createTicketDto)
        {
            var createdTicket = await _ticketService.CreateTicketAsync(createTicketDto); 
            return CreatedAtAction(nameof(GetTicket), new { id = createdTicket.TicketID }, createdTicket);
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(int id, UpdateTicketDto updateTicketDto)
        {
            try
            {
                await _ticketService.UpdateTicketAsync(id, updateTicketDto);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            try
            {
                await _ticketService.DeleteTicketAsync(id);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
