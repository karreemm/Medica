using DataBaseProject.Models;
namespace DataBaseProject.Services.Interfaces
{
	public interface IUserService
	{

       public User EditUser(User user);
       public List<User> GetAllUsers();
	}
}
