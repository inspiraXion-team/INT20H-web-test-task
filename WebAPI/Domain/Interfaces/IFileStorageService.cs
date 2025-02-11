using Microsoft.AspNetCore.Http;

namespace Domain.Interfaces
{
    public interface IFileStorageService
    {
        Task<string> UploadFileAsync(IFormFile file);
    }
}
