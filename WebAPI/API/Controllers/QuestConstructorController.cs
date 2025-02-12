using System.Security.Claims;
using Domain.DTOs;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [Route("api/quest-constructor")]
    [ApiController]
    public class QuestConstructorController : ControllerBase
    {
        private readonly IQuestConstructorService _questConstructorService;

        public QuestConstructorController(IQuestConstructorService questConstructorService)
        {
            _questConstructorService = questConstructorService;
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveQuest([FromBody] CreateQuestDTO questDTO)
        {
            if (questDTO == null)
            {
                return NotFound();
            }

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var result = await _questConstructorService.SaveQuest(questDTO, userId);

            return Ok(result);
        }

        [HttpGet("{questId}")]
        public async Task<ActionResult<QuestEditingDTO>> GetQuest(int questId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            try
            {
                var result = await _questConstructorService.GetQuestForEditing(userId, questId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}