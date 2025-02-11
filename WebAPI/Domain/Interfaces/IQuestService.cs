using Domain.DTOs;

namespace Domain.Interfaces
{
    public interface IQuestService
    {
        public Task<QuestDetailDTO?> GetQuest(int questId);
        public Task<List<QuestResponceDTO>> GetPublishedQuests();
    }
}
