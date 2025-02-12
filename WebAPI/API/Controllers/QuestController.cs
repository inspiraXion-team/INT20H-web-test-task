using System.Security.Claims;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/quest")]
    [ApiController]
    public class QuestController : ControllerBase
    {
        private readonly IQuestService _questService;

        public QuestController(IQuestService questService)
        {
            _questService = questService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuest(int id)
        {
            var quest = await _questService.GetQuest(id);
            if (quest == null)
            {
                return NotFound(new { message = "Quest not found" });
            }

            return Ok(quest);
        }

        [HttpGet("all/published")]
        public async Task<IActionResult> GetPublishedQuests()
        {
            var quests = await _questService.GetPublishedQuests();
            return Ok(quests);
        }

        [Authorize]
        [HttpGet("test")]
        public async Task<IActionResult> Test()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(new { message = userId });
        }
    }
}
