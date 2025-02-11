using Domain.Entities;
using Domain.Interfaces;
using System.Net.WebSockets;
using System.Text.Json;
using System.Text;
using Domain.DTOs;
using Domain.Enums;

namespace Infrastructure.Services
{
    public class QuestSessionManager : IQuestSessionManager
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly Dictionary<int, QuestSession> _activeSessions = new();

        public QuestSessionManager(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task HandleWebSocketAsync(WebSocket socket, int userId)
        {
            var buffer = new byte[1024 * 4];
            var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

            while (!result.CloseStatus.HasValue)
            {
                var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                var request = JsonSerializer.Deserialize<QuestActionDto>(message);

                if (request != null)
                {
                    if (request.Action == "start")
                    {
                        await StartQuestAsync(request.QuestId, userId, socket);
                    }
                    else if (request.Action == "answer")
                    {
                        await HandleUserAnswerAsync(request.QuestId, userId, request.Answer, socket);
                    }
                }

                result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            }

            await socket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
        }

        private async Task StartQuestAsync(int questId, int userId, WebSocket socket)
        {
            if (!_activeSessions.ContainsKey(userId))
            {
                var quest = await _unitOfWork.Repository<Quest>().GetByIDAsync(questId);
                if (quest == null || !quest.IsPublished)
                {
                    await SendMessageAsync(socket, new { error = "Quest not found or unpublished" });
                    return;
                }

                var tasks = await _unitOfWork.Repository<QuestTask>().GetAsync(
                    filter: t => t.QuestId == questId,
                    includeProperties: "TaskOptions,TaskWrite,Image,MediaContents"
                    );
                if (!tasks.Any())
                {
                    await SendMessageAsync(socket, new { error = "No tasks available" });
                    return;
                }

                var progress = new QuestProgress
                {
                    UserId = userId,
                    QuestId = questId,
                    Status = "In Progress",
                    StartedAt = DateTime.UtcNow,
                    Score = 0
                };
                await _unitOfWork.Repository<QuestProgress>().InsertAsync(progress);
                await _unitOfWork.SaveAsync();

                _activeSessions[userId] = new QuestSession
                {
                    QuestId = questId,
                    UserId = userId,
                    Tasks = tasks.OrderBy(t => t.Order).ToList(),
                    CurrentTaskIndex = 0
                };

                await SendNextTaskAsync(userId, socket);
            }
        }

        private async Task HandleUserAnswerAsync(int questId, int userId, string answer, WebSocket socket)
        {
            if (_activeSessions.TryGetValue(userId, out var session))
            {
                var currentTask = session.Tasks[session.CurrentTaskIndex];
                var correct = ValidateAnswer(currentTask, answer);

                if (correct)
                {
                    session.CurrentTaskIndex++;
                    await SaveTaskProgressAsync(userId, currentTask.Id);

                    if (session.CurrentTaskIndex < session.Tasks.Count)
                    {
                        await SendNextTaskAsync(userId, socket);
                    }
                    else
                    {
                        await CompleteQuestAsync(userId, questId);
                        await SendMessageAsync(socket, new { message = "Quest completed!" });
                        _activeSessions.Remove(userId);
                    }
                }
                else
                {
                    await SendMessageAsync(socket, new { message = "Incorrect answer. Try again!" });
                }
            }
        }

        private bool ValidateAnswer(QuestTask task, string answer)
        {
            if (task.QuestionType == QuestionType.Image)
            {
                var coordinates = answer.Split(',');
                if (coordinates.Length == 2)
                {
                    int x = int.Parse(coordinates[0]);
                    int y = int.Parse(coordinates[1]);

                    var taskImage = task.TaskImage;
                    if (taskImage != null)
                    {
                        bool isInRange = x >= taskImage.AnswerX1 && x <= taskImage.AnswerX2 &&
                                         y >= taskImage.AnswerY1 && y <= taskImage.AnswerY2;

                        return isInRange;
                    }
                }
                return false;
            }

            return task.QuestionType switch
            {
                QuestionType.Option => task.TaskOptions.Any(o => o.IsCorrect && o.OptionText.Equals(answer, StringComparison.OrdinalIgnoreCase)),
                QuestionType.Write => task.TaskWrite?.Answer.Equals(answer, StringComparison.OrdinalIgnoreCase) ?? false,
                _ => false
            };
        }

        private async Task SaveTaskProgressAsync(int userId, int taskId)
        {
            var progress = new TaskProgress
            {
                UserId = userId,
                TaskId = taskId,
                StartedAt = DateTime.UtcNow,
                CompletedAt = DateTime.UtcNow
            };
            await _unitOfWork.Repository<TaskProgress>().InsertAsync(progress);
            await _unitOfWork.SaveAsync();
        }

        private async Task CompleteQuestAsync(int userId, int questId)
        {
            var progress = await _unitOfWork.Repository<QuestProgress>()
                .GetFirstOrDefaultAsync(qp => qp.UserId == userId && qp.QuestId == questId);
            if (progress != null)
            {
                progress.Status = "Completed";
                progress.CompletedAt = DateTime.UtcNow;
                progress.Score = 100;
                await _unitOfWork.SaveAsync();
            }
        }

        private async Task SendNextTaskAsync(int userId, WebSocket socket)
        {
            if (_activeSessions.TryGetValue(userId, out var session))
            {
                var task = session.Tasks[session.CurrentTaskIndex];
                await SendMessageAsync(socket, new
                {
                    taskId = task.Id,
                    title = task.Title,
                    options = task.TaskOptions?.Select(o => o.OptionText).ToArray(),
                    write = task.TaskWrite?.Answer,
                    image = task.TaskImage?.ImageURL,
                    media = task.MediaContents?.Select(m => m.URL).ToArray()
                });
            }
        }

        private async Task SendMessageAsync(WebSocket socket, object message)
        {
            var json = JsonSerializer.Serialize(message);
            var bytes = Encoding.UTF8.GetBytes(json);
            await socket.SendAsync(new ArraySegment<byte>(bytes), WebSocketMessageType.Text, true, CancellationToken.None);
        }
    }
}
