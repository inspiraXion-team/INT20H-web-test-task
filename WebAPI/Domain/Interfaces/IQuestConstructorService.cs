using Domain.DTOs;

namespace Domain.Interfaces
{
    public interface IQuestConstructorService
    {
        Task<int> SaveQuest(CreateQuestDTO questDTO, int authorId);
    }
}
