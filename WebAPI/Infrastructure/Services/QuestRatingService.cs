using Domain.DTOs;
using Domain.Entities;
using Domain.Interfaces;

namespace Infrastructure.Services
{
    public class QuestRatingService : IQuestRatingService
    {
        private readonly IUnitOfWork _unitOfWork;

        public QuestRatingService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task AddQuestRatingAsync(QuestRatingCreateDTO ratingDto, int userId)
        {
            var quest = await _unitOfWork.Repository<Quest>()
                .GetAsync(q => q.Id == ratingDto.QuestId);

            if (quest == null)
            {
                throw new ArgumentException("Quest not found");
            }

            var newRating = new QuestRating
            {
                QuestId = ratingDto.QuestId,
                UserId = userId,
                Rating = ratingDto.Rating,
                Comment = ratingDto.Comment,
                CreatedAt = DateTime.UtcNow
            };

            await _unitOfWork.Repository<QuestRating>().InsertAsync(newRating);
            await _unitOfWork.SaveAsync();
        }
    }

}
