using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly UserService _service;

        public UserController(UserService service)
        {
            this._service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            return await _service.GetAllUsers();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _service.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            var cUser = await _service.CreateUser(user);
            return Ok(cUser);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserById(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            var uUser = await _service.UpdateUserById(id, user);
            if (uUser == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUserById(int id)
        {
            var dUser = await _service.DeleteUserById(id);
            if (dUser == null)
            {
                return NotFound();
            }
            return dUser;
        }
    }
}
