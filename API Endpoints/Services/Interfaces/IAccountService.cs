using DataBaseProject.Models;

namespace DataBaseProject.Services.Interfaces
{
	public interface IAccountService
	{
		public State Validate(string email, string password);

		public State CreateAccount(User user);

		public Deleteduser DeleteUser(User user);
		public User GetUser(string email);
		public int DeleteAllUsers();
	}
}
