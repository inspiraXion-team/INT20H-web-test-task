using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Services
{
    public class AzureBlobStorageService : IFileStorageService
    {
        private readonly BlobContainerClient _blobContainerClient;

        public AzureBlobStorageService()
        {
            var blobConnectionString = Environment.GetEnvironmentVariable("AZURE_BLOB_STORAGE_CONNECTION_STRING");
            var blobContainerName = Environment.GetEnvironmentVariable("AZURE_BLOB_STORAGE_CONTAINER_NAME");

            _blobContainerClient = new BlobContainerClient(blobConnectionString, blobContainerName);
            _blobContainerClient.CreateIfNotExists(PublicAccessType.Blob);
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
