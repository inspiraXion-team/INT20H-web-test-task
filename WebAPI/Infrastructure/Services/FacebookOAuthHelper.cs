using System.Text.Json;
using Domain.DTOs;

namespace Infrastructure.Services
{
    public static class FacebookOAuthHelper
    {
        private static readonly HttpClient _httpClient = new HttpClient();

        public static async Task<SocialUserDTO> GetUserInfoAsync(string accessToken)
        {
            var response = await _httpClient.GetAsync($"https://graph.facebook.com/me?fields=id,name,email&access_token={accessToken}");
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Failed to get Facebook user info.");
            }

            var content = await response.Content.ReadAsStringAsync();
            var fbUser = JsonSerializer.Deserialize<SocialUserResponse>(content);

            return new SocialUserDTO
            {
                Email = fbUser.Email,
                Name = fbUser.Name,
                Provider = "Facebook",
                ProviderId = fbUser.Id
            };
        }
    }
}
