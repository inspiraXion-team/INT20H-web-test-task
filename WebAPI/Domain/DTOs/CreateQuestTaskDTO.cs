using System.ComponentModel.DataAnnotations;
using Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace Domain.DTOs
{
    public class CreateQuestTaskDTO
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public QuestionType QuestionType { get; set; }
        [Required]
        public int Order { get; set; }
        public List<CreateTaskOptionDTO>? TaskOptions { get; set; }
        public CreateTaskWriteDTO? TaskWrite { get; set; }
        public CreateTaskImageDTO? TaskImage { get; set; }
        public List<IFormFile>? MediaFiles { get; set; }
    }
}
