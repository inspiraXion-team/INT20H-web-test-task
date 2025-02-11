using System.Text.Json;
using Domain.DTOs;

namespace Infrastructure.Services
{
    public static class GoogleOAuthHelper
    {
        private static readonly HttpClient _httpClient = new HttpClient();

        public static async Task<SocialUserDTO> GetUserInfoAsync(string accessToken)
        {
            var response = await _httpClient.GetAsync($"https://www.googleapis.com/oauth2/v2/userinfo?access_token={accessToken}");
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Failed to get Google user info.");
            }

            var content = await response.Content.ReadAsStringAsync();
            var googleUser = JsonSerializer.Deserialize<SocialUserResponse>(content);

            return new SocialUserDTO
            {
                Email = googleUser.Email,
                Name = googleUser.Name,
                Provider = "Google",
                ProviderId = googleUser.Id
            };
        }
    }
}
