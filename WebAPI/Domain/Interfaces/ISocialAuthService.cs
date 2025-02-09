using Application.DTOs;

namespace Domain.Interfaces
{
    public interface ISocialAuthService
    {
        Task<AuthResponseDTO> AuthenticateWithGoogleAsync(string accessToken);
        Task<AuthResponseDTO> AuthenticateWithFacebookAsync(string accessToken);
    }
}
