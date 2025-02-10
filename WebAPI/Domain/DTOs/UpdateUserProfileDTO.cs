using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Domain.DTOs
{
    public class UpdateUserProfileDTO
    {
        public string Username { get; set; }
        public IFormFile AvatarFile { get; set; }
    }
}
