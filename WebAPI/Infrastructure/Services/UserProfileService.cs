
using Domain.DTOs;
using Domain.Entities;
using Domain.Interfaces;

namespace Infrastructure.Services
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFileStorageService _blobStorageService;

        public UserProfileService(IUnitOfWork unitOfWork, IFileStorageService blobStorageService)
        {
            _unitOfWork = unitOfWork;
            _blobStorageService = blobStorageService;
        }

        public async Task<bool> UpdateUserProfileAsync(int userId, UpdateUserProfileDTO dto)
        {
            var userRepo = _unitOfWork.Repository<User>();
            var user = await userRepo.GetByIDAsync(userId);
            if (user == null)
            {
                return false;
            }

            if (!string.IsNullOrEmpty(dto.Username))
            {
                user.Username = dto.Username;
            }

            if (dto.AvatarFile != null)
            {
                string newAvatarUrl = await _blobStorageService.UploadFileAsync(dto.AvatarFile);
                user.AvatarURL = newAvatarUrl;
            }

            await userRepo.UpdateAsync(user);
            await _unitOfWork.SaveAsync();
            return true;
        }

        public async Task<UserDTO?> GetUserProfileAsync(int userId)
        {
            var user = await _unitOfWork.Repository<User>().GetByIDAsync(userId);

            if (user == null)
            {
                return null;
            }

            return new UserDTO
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                AvatarURL = user.AvatarURL
            };
        }

        public async Task<List<RewardDTO>?> GetUserRewardsAsync(int userId)
        {
            var rewards = await _unitOfWork.Repository<Reward>().GetAsync(
                filter: reward => reward.UserId == userId
                );

            if (rewards == null)
            {
                return null;
            }

            return rewards.Select(rw => new RewardDTO
            {
                Name = rw.Name,
                AwardedAt = rw.AwardedAt
            }).ToList();
        }

        public async Task<List<UserQuestDTO>?> GetUserQuestsAsync(int userId)
        {
            var quests = await _unitOfWork.Repository<Quest>().GetAsync(
                filter: quest => quest.AuthorId == userId,
                orderBy: quest => quest.OrderByDescending(quest => quest.CreatedAt)
                );

            if (quests == null)
            {
                return null;
            }

            return quests.Select(q => new UserQuestDTO
            {
                Id= q.Id,
                Title = q.Title,
                PosterURL = q.PosterURL,

            }).ToList();
        }
    }
}
