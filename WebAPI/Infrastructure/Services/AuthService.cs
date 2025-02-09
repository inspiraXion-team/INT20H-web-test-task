using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Application.DTOs;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;

        public AuthService(IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
        }

        public async Task<AuthResponseDTO> RegisterAsync(RegisterDTO registerDTO)
        {
            var userRepo = _unitOfWork.Repository<User>();

            if (await userRepo.GetFirstOrDefaultAsync(u => u.Email == registerDTO.Email) != null)
                throw new Exception("User with such email already exist!");

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDTO.Password);

            var user = new User
            {
                Username = registerDTO.Username,
                Email = registerDTO.Email,
                PasswordHash = passwordHash
            };

            await userRepo.InsertAsync(user);
            await _unitOfWork.SaveAsync();

            return await GenerateTokensAsync(user);
        }

        public async Task<AuthResponseDTO> LoginAsync(LoginDTO loginDTO)
        {
            var userRepo = _unitOfWork.Repository<User>();

            var user = await userRepo.GetFirstOrDefaultAsync(u => u.Email == loginDTO.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.PasswordHash))
                throw new Exception("Invalid email or password!");

            return await GenerateTokensAsync(user);
        }

        public async Task<AuthResponseDTO> RefreshTokenAsync(RefreshTokenDTO refreshTokenDTO)
        {
            var refreshTokenRepo = _unitOfWork.Repository<RefreshToken>();

            var refreshToken = await refreshTokenRepo.GetFirstOrDefaultAsync(
                filter: rt => rt.Token == refreshTokenDTO.RefreshToken, 
                includeProperties: "User");

            if (refreshToken == null || refreshToken.ExpiryTime < DateTime.UtcNow)
                throw new Exception("Недійсний або прострочений refresh токен");

            return await GenerateTokensAsync(refreshToken.User);
        }

        private async Task<AuthResponseDTO> GenerateTokensAsync(User user)
        {
            var accessToken = GenerateAccessToken(user);
            var refreshToken = GenerateRefreshToken();

            var refreshTokenRepo = _unitOfWork.Repository<RefreshToken>();

            var existingToken = await refreshTokenRepo.GetFirstOrDefaultAsync(rt => rt.UserId == user.Id);
            if (existingToken != null)
            {
                await refreshTokenRepo.DeleteAsync(existingToken);
            }

            var newRefreshToken = new RefreshToken
            {
                Token = refreshToken,
                ExpiryTime = DateTime.UtcNow.AddDays(7),
                UserId = user.Id
            };

            await refreshTokenRepo.InsertAsync(newRefreshToken);
            await _unitOfWork.SaveAsync();

            return new AuthResponseDTO
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        private string GenerateAccessToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Secret"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Status.ToString())
        };

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(15),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
            }
            return Convert.ToBase64String(randomNumber);
        }
    }
}
