using Domain.DTOs;

namespace Domain.Interfaces
{
    public interface IQuestRatingService
    {
        Task AddQuestRatingAsync(QuestRatingCreateDTO ratingDto, int userId);
    }

}
