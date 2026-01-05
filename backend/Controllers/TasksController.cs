using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TaskManager.DTOs;
using TaskManager.Models;
using TaskManager.Data;
namespace TaskManager.API
{
    [Route("api/tasks")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            
            var tasks = await _context.Tasks
                            .Include(t => t.User)
                            .ToListAsync();            

            var taskDto = tasks.Select(t => new TaskResponseDto
            {
                Id = t.Id, 
                Title = t.Title,  
                IsDone = t.IsDone, 
                UserId = t.UserId, 
                UserEmail = t.User?.Email
            });

            return Ok(taskDto);
        }



        // POST /api/tasks
        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskCreateDto dto)
        {
            var user = await _context.Users
                             .Where(u => u.Id == dto.UserId)
                             .Select(u => new { u.Id, u.Email })
                             .FirstOrDefaultAsync();
            if (user == null)
                return BadRequest(new { message = "User not found" });

            var task = new TaskItem
            {
                Title = dto.Title,
                IsDone = dto.IsDone,
                UserId = dto.UserId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

           var response = new TaskResponseDto
                {
                    Id = task.Id,
                    Title = task.Title,
                    IsDone = task.IsDone,
                    UserId = task.UserId,
                    UserEmail = user.Email
                };

            return CreatedAtAction(nameof(Get), new { id = task.Id }, response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TaskUpdateDto dto)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) 
                return NotFound(new { message = "Task not found" });

            // Update only the allowed fields
            task.Title = dto.Title;
            task.IsDone = dto.IsDone;

            await _context.SaveChangesAsync();

            // Return a response DTO instead of entity
            var response = new TaskResponseDto
            {
                Id = task.Id,
                Title = task.Title,
                IsDone = task.IsDone,
                UserId = task.UserId,
                UserEmail = (await _context.Users
                                .Where(u => u.Id == task.UserId)
                                .Select(u => u.Email)
                                .FirstOrDefaultAsync())
            };

            return Ok(response);
        }

        // DELETE /tasks/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                // Return 404 if not found
                return NotFound(new { message = "Task not found" });
            }
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            // Return 204 No Content
            return NoContent();
        }

    }
}
