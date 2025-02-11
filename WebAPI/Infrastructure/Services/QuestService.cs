using Domain.DTOs;
using Domain.Entities;
using Domain.Interfaces;

namespace Infrastructure.Services
{
    public class QuestService : IQuestService
    {
        private readonly IUnitOfWork _unitOfWork;

        public QuestService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<QuestDetailDTO?> GetQuest(int questId)
        {
            var quest = await _unitOfWork.Repository<Quest>()
                .GetFirstOrDefaultAsync(
                    q => q.Id == questId,
                    includeProperties: "QuestTasks,QuestTasks.TaskOptions,QuestTasks.TaskImage,QuestTasks.MediaContents,Author,Rating"
                );

            if (quest == null)
                return null;

            var questRating = quest.Rating.Any() ? quest.Rating.Average(r => r.Rating) : 0;

            var authorRatings = await _unitOfWork.Repository<QuestRating>()
                .GetAsync(r => r.UserId == quest.AuthorId);
            var authorRating = authorRatings.Any() ? authorRatings.Average(r => r.Rating) : 0;

            return new QuestDetailDTO
            {
                Id = quest.Id,
                Title = quest.Title,
                Description = quest.Description,
                PosterURL = quest.PosterURL,
                QuestRating = questRating,
                AuthorRating = authorRating,
                Tasks = quest.QuestTasks
                    .OrderBy(t => t.Order)
                    .Select(task => new QuestTaskDetailDTO
                    {
                        Title = task.Title,
                        QuestionType = task.QuestionType,
                        Order = task.Order,
                        TaskOptions = task.TaskOptions?.Select(o => o.OptionText).ToList(),
                        TaskImageURL = task.TaskImage?.ImageURL,
                        MediaContent = task.MediaContents?.Select(m => m.URL).ToList()
                    }).ToList()
            };
        }

        public async Task<List<QuestResponceDTO>> GetPublishedQuests()
        {
            var quests = await _unitOfWork.Repository<Quest>().GetAsync(quest => quest.IsPublished);

            var questRatings = await _unitOfWork.Repository<QuestRating>().GetAsync(r => quests.Select(q => q.Id).Contains(r.QuestId));

            var questRatingsDict = questRatings
                .GroupBy(qr => qr.QuestId)
                .ToDictionary(g => g.Key, g => g.Average(qr => qr.Rating));

            var authorRatingsDict = questRatings
                .GroupBy(qr => qr.UserId)
                .ToDictionary(g => g.Key, g => g.Average(qr => qr.Rating));

            return quests.Select(quest => new QuestResponceDTO
            {
                Id = quest.Id,
                PosterURL = quest.PosterURL,
                QuestRating = questRatingsDict.GetValueOrDefault(quest.Id, 0),
                AuthorRating = authorRatingsDict.GetValueOrDefault(quest.AuthorId, 0),
            }).ToList();
        }
    }
}
