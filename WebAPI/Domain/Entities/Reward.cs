using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class Reward
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime AwardedAt { get; set; }
    }
}
