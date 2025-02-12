namespace Domain.DTOs
{
    public class QuestDetailDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string PosterURL { get; set; }
        public double QuestRating { get; set; }
        public double AuthorRating { get; set; }
        public List<QuestTaskDetailDTO> Tasks { get; set; }
    }
}
