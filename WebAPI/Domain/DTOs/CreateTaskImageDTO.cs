using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Domain.DTOs
{
    public class CreateTaskImageDTO
    {
        public IFormFile Image { get; set; }
        [Required]
        public int AnswerX1 { get; set; }
        [Required]
        public int AnswerY1 { get; set; }
        [Required]
        public int AnswerX2 { get; set; }
        [Required]
        public int AnswerY2 { get; set; }
    }
}
