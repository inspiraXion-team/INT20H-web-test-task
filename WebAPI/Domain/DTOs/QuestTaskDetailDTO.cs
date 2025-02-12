using Domain.Enums;

namespace Domain.DTOs
{
    public class QuestTaskDetailDTO
    {
        public string Title { get; set; }
        public QuestionType QuestionType { get; set; }
        public int Order { get; set; }
        public List<string>? TaskOptions { get; set; }
        public string? TaskImageURL { get; set; }
        public List<string>? MediaContent { get; set; }
    }
}
