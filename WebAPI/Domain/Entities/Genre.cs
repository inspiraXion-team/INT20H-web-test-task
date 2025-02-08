using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class Genre
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string URL { get; set; }
        public IEnumerable<QuestTask> Tasks { get; set; }
        public IEnumerable<Quest> Quests { get; set; }
    }
}
