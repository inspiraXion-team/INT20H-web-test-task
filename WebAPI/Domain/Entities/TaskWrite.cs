using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class TaskWrite
    {
        [Key]
        public int Id { get; set; }
        public int TaskId { get; set; }
        public QuestTask Task { get; set; }
        public string Answer { get; set; }
    }
}
