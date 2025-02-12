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
        public IEnumerable<TaskOption> TaskOptions { get; set; } = Enumerable.Empty<TaskOption>();
        public TaskWrite? TaskWrite { get; set; } = null!;
        public TaskImage? TaskImage { get; set; } = null!;
        public IEnumerable<MediaContent> MediaContents { get; set; } = Enumerable.Empty<MediaContent>();
        public IEnumerable<TaskProgress> TaskProgresses { get; set; }
    }
}
