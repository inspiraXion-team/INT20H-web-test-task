using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Domain.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        [Required]
        public string Email { get; set; }
        public string AvatarURL { get; set; } = string.Empty;
        public UserStatus Status { get; set; } = UserStatus.User;
        public RefreshToken RefreshToken { get; set; }
        public ICollection<QuestRating> QuestRatings { get; set; }
        public ICollection<QuestProgress> QuestProgresses { get; set; }
        public ICollection<Reward> Rewards { get; set; }
        public AuthorRating Rating { get; set; }
        public ICollection<Quest> Quests { get; set; }
        public ICollection<TaskProgress> TaskProgresses { get; set; }
    }
}
