﻿using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class Quest
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; } = string.Empty;
        public int TimeLimit { get; set; } = 0;
        public string PosterURL { get; set; } = string.Empty;
        public int AuthorId { get; set; }
        public User Author { get; set; }
        [Required]
        public bool IsPublished { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public ICollection<QuestRating> Rating { get; set; }
        public ICollection<QuestProgress> QuestProgresses {  get; set; }
        public ICollection<QuestTask> QuestTasks { get; set; }
    }
}
