using System.Net.WebSockets;

namespace Domain.Interfaces
{
    public interface IQuestSessionManager
    {
        Task HandleWebSocketAsync(WebSocket socket, int userId);
    }
}
