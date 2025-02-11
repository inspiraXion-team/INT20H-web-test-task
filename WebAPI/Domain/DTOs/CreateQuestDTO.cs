using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Domain.DTOs
{
    public class CreateQuestDTO
    {
        [Required]
        public string Title { get; set; }
        public string Description { get; set; } = string.Empty;
        public int TimeLimit { get; set; } = 0;
        public IFormFile? Poster { get; set; }
        public bool IsPublished { get; set; }
        public List<CreateQuestTaskDTO> Tasks { get; set; } = new();
    }
}
