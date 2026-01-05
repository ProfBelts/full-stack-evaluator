namespace TaskManager.DTOs
{
    // DTO for Updating User 
    public class UserResponseDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public List<TaskResponseDtoForUser> Tasks { get; set; } = new List<TaskResponseDtoForUser>();


    }
}
