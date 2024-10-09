using Microsoft.EntityFrameworkCore;
using TicketManagement_Backend.Models;

namespace TicketManagement_Backend.Data
{
    public class TicketContext : DbContext
    {
        public TicketContext(DbContextOptions<TicketContext> options) : base(options) { }

        public DbSet<Ticket> Tickets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ticket>()
                .Property(t => t.Status)
                .HasConversion<string>(); 

            base.OnModelCreating(modelBuilder);
        }
    }
}
