using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class ChatParticipant
    {
        [Key]
        public int Id { get; set; }
        public int ChatId { get; set; }
        public Chat Chat { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public bool IsCreator { get; set; }
        public DateTime JoinedAt { get; set; }
    }
}
