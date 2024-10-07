using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Models;
using backend.Services;
using backend.Dto;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserService _userService;

        public AuthController(IConfiguration configuration, UserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto login)
        {
            //  User authentication
            var user =  await _userService.Authenticate(login);

            if (user.Id == 0)
                return Unauthorized(new { message = "¡Credenciales incorrectas!" });            
           
            // Generate JWT token
            var token = GenerateJwtToken(user);

            return Ok(new { Token = token, User = new { Id = user.Id, Username = user.Username, Email = user.Email } });
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(LoginDto dto)
        {            
            User user = new User() { Email = dto.Email, Password = dto.Password, Username = dto.Username };
            var res = await _userService.CreateUser(user);
            if (res.Id == 0)            
                return Ok(new { message = "¡Este correo ya existe!" });            
            else
            {
                res.Password = "";
                return Ok(res);
            }                
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSecret = _configuration["JwtSettings:SecretKey"];
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)
                    // Add more claims as needed (e.g., roles)
                }),
                Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}

