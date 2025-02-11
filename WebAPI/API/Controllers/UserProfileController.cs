using Domain.DTOs;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Authorize]
    [Route("api/profile")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileService _userProfileService;

        public UserProfileController(IUserProfileService userService)
        {
            _userProfileService = userService;
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromForm] UpdateUserProfileDTO dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var result = await _userProfileService.UpdateUserProfileAsync(userId, dto);

            if (!result)
            {
                return NotFound("User not found.");
            }

            return Ok("Profile updated.");
        }

        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetProfile()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var user = await _userProfileService.GetUserProfileAsync(userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
        }

        [HttpGet("rewards")]
        public async Task<ActionResult<List<RewardDTO>>> GetUserRewards()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var rewards = await _userProfileService.GetUserRewardsAsync(userId);

            if (rewards == null)
            {
                return NotFound("User does not have rewards");
            }

            return Ok(rewards);
        }

        [HttpGet("quests")]
        public async Task<ActionResult<List<UserQuestDTO>>> GetUserQuests()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var quests = await _userProfileService.GetUserQuestsAsync(userId);

            if(quests == null)
            {
                return NotFound("User does not have quests");
            }

            return Ok(quests);
        }

    }
}
