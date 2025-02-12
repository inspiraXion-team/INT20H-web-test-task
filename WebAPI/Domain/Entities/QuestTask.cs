using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Domain.Entities
{
    public class QuestTask
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public QuestionType QuestionType { get; set; }
        public int Order { get; set; }
        public int QuestId { get; set; }
        public Quest Quest { get; set; }
        public ICollection<TaskOption> TaskOptions { get; set; } = new List<TaskOption>();
        public TaskWrite? TaskWrite { get; set; } = null!;
        public TaskImage? TaskImage { get; set; } = null!;
        public ICollection<MediaContent> MediaContents { get; set; } = new List<MediaContent>();
        public ICollection<TaskProgress> TaskProgresses { get; set; }
    }
}
