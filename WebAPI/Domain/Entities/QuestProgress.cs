using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class QuestProgress
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int QuestId { get; set; }
        public Quest Quest { get; set; }
        [Required]
        public string Status { get; set; }
        public DateTime CompletedAt { get; set; }
        public DateTime StartedAt { get; set; }
        public int Score { get; set; }
    }
}
