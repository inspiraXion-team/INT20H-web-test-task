using System.Security.Claims;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("ws/quest")]
    public class QuestController : ControllerBase
    {
        private readonly IQuestSessionManager _questSessionManager;

        public QuestController(IQuestSessionManager questSessionManager)
        {
            _questSessionManager = questSessionManager;
        }

        [HttpGet]
        public async Task Get()
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
