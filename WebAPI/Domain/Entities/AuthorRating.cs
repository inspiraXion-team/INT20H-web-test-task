using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class AuthorRating
    {
        [Key]
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public User Author { get; set; }
        [Required]
        public decimal Rating { get; set; }
    }
}
