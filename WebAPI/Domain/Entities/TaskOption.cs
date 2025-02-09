using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class TaskOption
    {
        [Key]
        public int Id { get; set; }
        public int TaskId { get; set; }
        public QuestTask Task { get; set; }
        public string OptionText { get; set; }
        public bool IsCorrect { get; set; }
    }
}
