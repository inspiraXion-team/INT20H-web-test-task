namespace Domain.DTOs
{
    public class QuestEditingDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int TimeLimit { get; set; }
        public string PosterURL { get; set; }
        public bool IsPublished { get; set; }
        public List<QuestTaskEditingDTO> Tasks { get; set; }
    }
}
