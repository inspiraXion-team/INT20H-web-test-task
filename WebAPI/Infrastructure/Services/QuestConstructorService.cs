using Domain.DTOs;
using Domain.Entities;
using Domain.Interfaces;

namespace Infrastructure.Services
{
    public class QuestConstructorService : IQuestConstructorService
    {
        public readonly IFileStorageService _blobStorageService;
        public readonly IUnitOfWork _unitOfWork;

        public QuestConstructorService(IFileStorageService blobStorageService, IUnitOfWork unitOfWork)
        {
            _blobStorageService = blobStorageService;
            _unitOfWork = unitOfWork;
        }

        public async Task<int> SaveQuest(CreateQuestDTO questDTO, int authorId)
        {
            var questRepository = _unitOfWork.Repository<Quest>();
            var taskRepository = _unitOfWork.Repository<QuestTask>();
            var taskOptionRepository = _unitOfWork.Repository<TaskOption>();
            var taskWriteRepository = _unitOfWork.Repository<TaskWrite>();
            var taskImageRepository = _unitOfWork.Repository<TaskImage>();
            var mediaRepository = _unitOfWork.Repository<MediaContent>();

            var posterUrl = questDTO.Poster != null
                ? await _blobStorageService.UploadFileAsync(questDTO.Poster)
                : string.Empty;

            var quest = new Quest
            {
                Title = questDTO.Title,
                Description = questDTO.Description,
                TimeLimit = questDTO.TimeLimit,
                PosterURL = posterUrl,
                AuthorId = authorId,
                IsPublished = questDTO.IsPublished,
                CreatedAt = DateTime.UtcNow
            };

            await questRepository.InsertAsync(quest);
            await _unitOfWork.SaveAsync();

            foreach (var taskDto in questDTO.Tasks)
            {
                var questTask = new QuestTask
                {
                    Title = taskDto.Title,
                    QuestionType = taskDto.QuestionType,
                    Order = taskDto.Order,
                    QuestId = quest.Id
                };

                await taskRepository.InsertAsync(questTask);
                await _unitOfWork.SaveAsync();

                if (taskDto.TaskOptions != null)
                {
                    var options = taskDto.TaskOptions.Select(o => new TaskOption
                    {
                        TaskId = questTask.Id,
                        OptionText = o.OptionText,
                        IsCorrect = o.IsCorrect
                    });

                    await taskOptionRepository.InsertRangeAsync(options);
                }
                else if(taskDto.TaskWrite != null)
                {
                    var taskWrite = new TaskWrite
                    {
                        TaskId = questTask.Id,
                        Answer = taskDto.TaskWrite.Answer
                    };

                    await taskWriteRepository.InsertAsync(taskWrite);
                }
                else if(taskDto.TaskImage != null)
                {
                    var imageUrl = await _blobStorageService.UploadFileAsync(taskDto.TaskImage.Image);

                    var taskImage = new TaskImage
                    {
                        TaskId = questTask.Id,
                        AnswerX1 = taskDto.TaskImage.AnswerX1,
                        AnswerY1 = taskDto.TaskImage.AnswerY1,
                        AnswerX2 = taskDto.TaskImage.AnswerX2,
                        AnswerY2 = taskDto.TaskImage.AnswerY2,
                        ImageURL = imageUrl
                    };

                    await taskImageRepository.InsertAsync(taskImage);
                }

                if (taskDto.MediaFiles != null)
                {
                    foreach (var mediaFile in taskDto.MediaFiles)
                    {
                        var mediaUrl = await _blobStorageService.UploadFileAsync(mediaFile);

                        var mediaContent = new MediaContent
                        {
                            TaskId = questTask.Id,
                            URL = mediaUrl
                        };

                        await mediaRepository.InsertAsync(mediaContent);
                    }
                }

                await _unitOfWork.SaveAsync();
            }

            return quest.Id;
        }

        public async Task<QuestEditingDTO> GetQuestForEditing(int userId, int questId)
        {
            var quest = await _unitOfWork.Repository<Quest>()
        .GetFirstOrDefaultAsync(q => q.Id == questId && q.AuthorId == userId,
            "QuestTasks,QuestTasks.TaskOptions,QuestTasks.TaskWrite,QuestTasks.TaskImage,QuestTasks.MediaContents");

            if (quest == null)
            {
                throw new KeyNotFoundException("Quest not found or you don't have access to the quest");
            }

            var questDto = new QuestEditingDTO
            {
                Title = quest.Title,
                Description = quest.Description,
                TimeLimit = quest.TimeLimit,
                PosterURL = quest.PosterURL,
                IsPublished = quest.IsPublished,
                Tasks = quest.QuestTasks
                    .OrderBy(t => t.Order)
                    .Select(task => new QuestTaskEditingDTO
                    {
                        Title = task.Title,
                        QuestionType = task.QuestionType,
                        Order = task.Order,
                        TaskOptions = task.TaskOptions?.Select(opt => new TaskOptionEditingDTO
                        {
                            Text = opt.OptionText,
                            IsCorrect = opt.IsCorrect
                        }) ?? Enumerable.Empty<TaskOptionEditingDTO>(),
                        TaskWrite = task.TaskWrite != null ? new TaskWriteEditingDTO
                        {
                            Answer = task.TaskWrite.Answer
                        } : null,
                        TaskImage = task.TaskImage != null ? new TaskImageEditingDTO
                        {
                            AnswerX1 = task.TaskImage.AnswerX1,
                            AnswerY1 = task.TaskImage.AnswerY1,
                            AnswerX2 = task.TaskImage.AnswerX2,
                            AnswerY2 = task.TaskImage.AnswerY2,
                            ImageURL = task.TaskImage.ImageURL
                        } : null,
                        MediaContents = task.MediaContents.Select(mc => mc.URL).ToList() ?? new List<string>()
                    }).ToList()
            };

            return questDto;
        }
    }
}
