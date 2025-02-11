using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class Chat
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }

        public IEnumerable<ChatMessage> ChatMessages { get; set; }
        public IEnumerable<ChatParticipant> Participants { get; set; }
    }
}
