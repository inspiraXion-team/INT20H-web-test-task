using System.Security.Claims;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("ws/quest")]
    public class QuestSessionController : ControllerBase
    {
        private readonly IQuestSessionManager _questSessionManager;

        public QuestSessionController(IQuestSessionManager questSessionManager)
        {
            _questSessionManager = questSessionManager;
        }

        [HttpGet]
        public async Task CreateSession()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var socket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                await _questSessionManager.HandleWebSocketAsync(socket, userId);
            }
            else
            {
                HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
        }
    }
}
