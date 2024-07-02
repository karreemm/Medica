using System;
using System.Collections.Generic;
using System.Linq;
using DataBaseProject.Data;
using DataBaseProject.Models;
using DataBaseProject.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataBaseProject.Services.Classes
{
    public class UserService : IUserService
    {
        private readonly AppDbContext DB;

        public UserService(AppDbContext db)
        {
            DB = db;
        }


		//edit user data
		public User EditUser(User user)
		{
			var existingUser = DB.Users.FromSqlRaw($"SELECT * FROM \"User\" WHERE Uid = {user.Uid}")
                .FirstOrDefault();
			if (existingUser != null)
			{
				existingUser.Firstname = user.Firstname;
				existingUser.Lastname = user.Lastname;
				existingUser.Password = user.Password;
				existingUser.Address = user.Address;
				existingUser.Email = user.Email;
				existingUser.Phone = user.Phone;
				existingUser.Github = user.Github;
				existingUser.Linkedin = user.Linkedin;
				existingUser.Profileimage = user.Profileimage;
				existingUser.Role = user.Role;
				existingUser.Date = user.Date;
                existingUser.Facebook = user.Facebook;
                existingUser.Insta = user.Insta;
                existingUser.Twitter = user.Twitter;



                DB.SaveChanges();
			}

			User editedUser = existingUser;
			return editedUser;
		}

        public List<User> GetAllUsers()
        {
            // Retrieve all users using a raw SQL query
            var users = DB.Users.FromSqlRaw(@$"SELECT * FROM ""User""  ").ToList();
            List<User> allusers = users;
            return allusers;
        }
    }
}