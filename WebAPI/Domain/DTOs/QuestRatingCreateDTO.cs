namespace Domain.DTOs
{
    public class QuestRatingCreateDTO
    {
        public int QuestId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
    }

}
