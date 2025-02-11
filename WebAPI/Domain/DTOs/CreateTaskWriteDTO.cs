using System.ComponentModel.DataAnnotations;

namespace Domain.DTOs
{
    public class CreateTaskWriteDTO
    {
        [Required]
        public string Answer { get; set; }
    }
}
