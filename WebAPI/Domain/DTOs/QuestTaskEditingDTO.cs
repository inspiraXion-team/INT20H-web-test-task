using Domain.Entities;
using Domain.Enums;

namespace Domain.DTOs
{
    public class QuestTaskEditingDTO
    {
        public string Title { get; set; }
        public QuestionType QuestionType { get; set; }
        public int Order { get; set; }
        public IEnumerable<TaskOptionEditingDTO> TaskOptions { get; set; } = Enumerable.Empty<TaskOptionEditingDTO>();
        public TaskWriteEditingDTO? TaskWrite { get; set; } = null!;
        public TaskImageEditingDTO? TaskImage { get; set; } = null!;
        public IEnumerable<string> MediaContents { get; set; } = Enumerable.Empty<string>();
    }
}
