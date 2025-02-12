using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Services
{
    public class AzureBlobStorageService : IFileStorageService
    {
        private readonly BlobContainerClient _blobContainerClient;

        public AzureBlobStorageService(IConfiguration configuration)
        {
            var blobConnectionString = configuration["AZURE_BLOB_STORAGE_CONNECTION_STRING"];
            var blobContainerName = configuration["AZURE_BLOB_STORAGE_CONTAINER_NAME"];

            if (string.IsNullOrEmpty(blobConnectionString) || string.IsNullOrEmpty(blobContainerName))
            {
                throw new ArgumentException("Azure Blob Storage connection string or container name is missing.");
            }

            _blobContainerClient = new BlobContainerClient(blobConnectionString, blobContainerName);
        }

        public async Task<string> UploadFileAsync(IFormFile file)
        {
            var blobClient = _blobContainerClient.GetBlobClient(Guid.NewGuid().ToString() + Path.GetExtension(file.FileName));

            using (var stream = file.OpenReadStream())
            {
                await blobClient.UploadAsync(stream, true);
            }

            return blobClient.Uri.ToString();
        }
    }
}
