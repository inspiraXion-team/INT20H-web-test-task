using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class TaskProgress
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int TaskId { get; set; }
        public QuestTask Task { get; set; }
        public DateTime CompletedAt { get; set; }
        public DateTime StartedAt { get; set; }
    }
}
