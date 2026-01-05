namespace TaskManager.DTOs
{
    public class TaskCreateDto
    {
        public string Title { get; set; } = string.Empty;
        public bool IsDone { get; set; } = false;
        public int UserId { get; set; } // Associate task with a user
    }
}
