using System.Security.Claims;
using Domain.DTOs;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [Route("api/quest-rating")]
    [ApiController]
    public class QuestRatingController : ControllerBase
    {
        private readonly IQuestRatingService _questRatingService;

        public QuestRatingController(IQuestRatingService questRatingService)
        {
            _questRatingService = questRatingService;
        }

        [HttpPost]
        public async Task<IActionResult> AddQuestRating([FromBody] QuestRatingCreateDTO ratingDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            if (ratingDto.Rating < 1 || ratingDto.Rating > 5)
            {
                return BadRequest(new { message = "The rating must be between 1 and 5." });
            }

            try
            {
                await _questRatingService.AddQuestRatingAsync(ratingDto, userId);
                return Ok(new { message = "Rating added successfully." });
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }

}
