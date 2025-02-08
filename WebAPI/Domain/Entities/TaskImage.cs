using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class TaskImage
    {
        [Key]
        public int Id { get; set; }
        public int TaskId { get; set; }
        public QuestTask Task { get; set; }
        public int AnswerX1 { get; set; }
        public int AnswerY1 { get; set; }
        public int AnswerX2 { get; set; }
        public int AnswerY2 { get; set; }
        public string ImageURL { get; set; }
    }
}
