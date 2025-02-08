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
        public IEnumerable<QuestRating> QuestRatings { get; set; }
        public IEnumerable<ChatParticipant> ChatParticipants { get; set; }
        public IEnumerable<ChatMessage> ChatMessages { get; set; }
        public IEnumerable<QuestProgress> QuestProgresses { get; set; }
        public IEnumerable<Reward> Rewards { get; set; }
        public AuthorRating Rating { get; set; }
        public IEnumerable<Quest> Quests { get; set; }
        public IEnumerable<TaskProgress> TaskProgresses { get; set; }
    }
}
