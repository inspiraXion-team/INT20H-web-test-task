using Application.DTOs;
using Domain.DTOs;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ISocialAuthService _socialAuthService;

        public AuthController(IAuthService authService, ISocialAuthService socialAuthService)
        {
            _authService = authService;
            _socialAuthService = socialAuthService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var authResponse = await _authService.RegisterAsync(registerDTO);
                return Ok(authResponse);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var authResponse = await _authService.LoginAsync(loginDTO);
                return Ok(authResponse);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDTO refreshTokenDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var authResponse = await _authService.RefreshTokenAsync(refreshTokenDTO);
                return Ok(authResponse);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPost("external-login/{provider}")]
        public async Task<IActionResult> ExternalLogin(string provider, [FromBody] ExternalAuthDTO authDTO)
        {
            try
            {
                AuthResponseDTO authResponse = provider switch
                {
                    "google" => await _socialAuthService.AuthenticateWithGoogleAsync(authDTO.AccessToken),
                    "facebook" => await _socialAuthService.AuthenticateWithFacebookAsync(authDTO.AccessToken),
                    _ => throw new Exception("Unsupported provider")
                };

                return Ok(authResponse);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
