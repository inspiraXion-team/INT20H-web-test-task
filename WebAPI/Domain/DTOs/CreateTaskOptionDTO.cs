using System.ComponentModel.DataAnnotations;


namespace Domain.DTOs
{
    public class CreateTaskOptionDTO
    {
        [Required]
        public string OptionText { get; set; }
        [Required]
        public bool IsCorrect { get; set; }
    }
}
