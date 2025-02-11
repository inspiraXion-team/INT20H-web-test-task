using Domain.Entities;

namespace Domain.DTOs
{
    public class QuestSession
    {
        public int QuestId { get; set; }
        public int UserId { get; set; }
        public List<QuestTask> Tasks { get; set; } = new();
        public int CurrentTaskIndex { get; set; }
    }
}
