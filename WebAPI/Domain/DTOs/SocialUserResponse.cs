using System.ComponentModel.DataAnnotations;

namespace Domain.DTOs
{
    public class SocialUserResponse
    {
        [Required]
        public string Id { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
