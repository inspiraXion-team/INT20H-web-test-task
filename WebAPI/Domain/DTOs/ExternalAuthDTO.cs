using System.ComponentModel.DataAnnotations;

namespace Domain.DTOs
{
    public class ExternalAuthDTO
    {
        [Required]
        public string AccessToken { get; set; }
    }
}
