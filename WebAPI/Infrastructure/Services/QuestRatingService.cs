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
                .GetFirstOrDefaultAsync(q => q.Id == ratingDto.QuestId);

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

            await UpdateAuthorRating(quest.AuthorId);
        }

        public async Task UpdateAuthorRating(int authorId)
        {
            var authorRatings = await _unitOfWork.Repository<QuestRating>()
                .GetAsync(r => r.UserId == authorId);

            var averageRating = authorRatings.Any() ? authorRatings.Average(r => r.Rating) : 0;

            var authorRating = await _unitOfWork.Repository<AuthorRating>()
                .GetFirstOrDefaultAsync(ar => ar.AuthorId == authorId);

            if (authorRating != null)
            {
                authorRating.Rating = averageRating;
                await _unitOfWork.Repository<AuthorRating>().UpdateAsync(authorRating);
            }
            else
            {
                authorRating = new AuthorRating
                {
                    AuthorId = authorId,
                    Rating = averageRating
                };
                await _unitOfWork.Repository<AuthorRating>().InsertAsync(authorRating);
            }

            await _unitOfWork.SaveAsync();
        }
    }

}
