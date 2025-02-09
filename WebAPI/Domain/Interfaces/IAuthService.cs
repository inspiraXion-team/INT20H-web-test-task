using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs;

namespace Domain.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDTO> RegisterAsync(RegisterDTO registerDto);
        Task<AuthResponseDTO> LoginAsync(LoginDTO loginDto);
        Task<AuthResponseDTO> RefreshTokenAsync(RefreshTokenDTO refreshTokenDto);
    }
}
