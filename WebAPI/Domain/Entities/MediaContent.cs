using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class MediaContent
    {
        [Key]
        public int Id { get; set; }
        public string URL { get; set; }
        public int TaskId { get; set; }
        public QuestTask Task { get; set; }
    }
}
