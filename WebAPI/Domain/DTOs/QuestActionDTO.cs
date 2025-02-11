namespace Domain.DTOs
{
    public class QuestActionDto
    {
        public string Action { get; set; } = string.Empty;
        public int QuestId { get; set; }
        public int UserId { get; set; }
        public string Answer { get; set; } = string.Empty;
    }
}
