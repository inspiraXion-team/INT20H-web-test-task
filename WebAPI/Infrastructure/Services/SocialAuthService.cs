using Application.DTOs;
using Domain.DTOs;
using Domain.Interfaces;

namespace Infrastructure.Services
{
    public class SocialAuthService : ISocialAuthService
    {
        private readonly IAuthService _authService;

        public SocialAuthService(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<AuthResponseDTO> AuthenticateWithGoogleAsync(string accessToken)
        {
            var userInfo = await GoogleOAuthHelper.GetUserInfoAsync(accessToken);
            return await AuthenticateSocialUser(userInfo);
        }

        public async Task<AuthResponseDTO> AuthenticateWithFacebookAsync(string accessToken)
        {
            var userInfo = await FacebookOAuthHelper.GetUserInfoAsync(accessToken);
            return await AuthenticateSocialUser(userInfo);
        }

        private async Task<AuthResponseDTO> AuthenticateSocialUser(SocialUserDTO userInfo)
        {
            return await _authService.RegisterAsync(new RegisterDTO
            {
                Email = userInfo.Email,
                Username = userInfo.Name,
                Password = Guid.NewGuid().ToString()
            });
        }
    }
}
