using Domain.DTOs;

namespace Domain.Interfaces
{
    public interface IUserProfileService
    {
        Task<bool> UpdateUserProfileAsync(int userId, UpdateUserProfileDTO dto);
        Task<UserDTO?> GetUserProfileAsync(int userId);
        Task<List<RewardDTO>?> GetUserRewardsAsync(int userId);
        Task<List<UserQuestDTO>?> GetUserQuestsAsync(int userId);
    }
}
