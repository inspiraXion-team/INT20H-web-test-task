using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class ChatMessage
    {
        [Key]
        public int Id { get; set; }
        public int ChatId { get; set; }
        public Chat Chat { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string Message { get; set; }
        public DateTime SentAt { get; set; }
    }
}
