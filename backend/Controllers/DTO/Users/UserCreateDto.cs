namespace TaskManager.DTOs
{
    // DTO for creating a new user
    public class UserCreateDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
