using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Models;
using TaskManager.DTOs;
using BCrypt.Net;


namespace TaskManager.Controllers
{
    [Route("users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.Include(u => u.Tasks).ToListAsync();
            return Ok(users);
        }

        // GET: api/users/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _context.Users.Include(u => u.Tasks)
                                           .FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) return NotFound();
            return Ok(user);
        }

         // POST: api/users
         // Use DTO to transfer only necessary field for creating the users payload.
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserCreateDto dto)
        {
            // Hash the password before saving
            var user = new User
            {
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password) // hashed
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Return 201 Created, with the new user
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }
    }

}
