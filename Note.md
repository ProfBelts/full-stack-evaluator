# Full Stack Evaluator – Submission Notes

## Authentication
- Session-based login implemented; users redirected to login if not authenticated.  
- Could improve with **JWT auth** and **role-based access** for admin features.

## User Management
- Full CRUD for users.  
- Could add **profile editing** and **password reset** functionality.

## Task Management
- Full CRUD for tasks; users see only their tasks.  
- Could add **deadlines, priorities, filtering**, and **task sharing**.

## Frontend & UX
- React app with login, register, tasks page, and navbar for logged-in user.  
- Used **Toastify** for notifications and **spinners** for loading states.  
- Could improve with **responsive design** and **inline editing**.

## Backend/API
- ASP.NET Core Web API with EF Core; endpoints for auth and tasks.  
- Uses **DTOs** for clean responses; error handling included.  
- Could add **unit tests**, consistent DTO usage, and improved Swagger docs.

## Observations
- Learned React state management, route protection, and frontend-backend integration.  
- Learned importance of clean endpoint design and session handling.

## Future Enhancements
- JWT auth and admin roles  
- User profile edits  
- Task metadata, inline editing  
- Testing and analytics
