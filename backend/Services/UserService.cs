using backend.Data;
using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class UserService : Service
    {
        public UserService(LibrarydbContext context) : base(context) { }

        public async Task<List<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetUserById(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User?> DeleteUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
            return user;
        }

        public async Task<User?> UpdateUserById(int id, User user)
        {
            var eUser = await _context.Users.FindAsync(id);
            if (eUser != null)
            {
                eUser.Username = user.Username;
                eUser.Email = user.Email;
                _context.Users.Update(eUser);
                await _context.SaveChangesAsync();
            }
            return eUser;
        }

        public async Task<User> CreateUser(User user)
        {
            var fUser = await _context.Users.Where(u => u.Email == user.Email).FirstOrDefaultAsync();
            if (fUser == null || fUser.Id == 0)
            {
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
            }
            return user;
        }

        public async Task<User> Authenticate(LoginDto dto)
        {
            try
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == dto.Email);

                // Check if user exists and password matches (implement your own password hashing and validation)
                if (user == null || !VerifyPasswordHash(dto.Password, user.Password))
                {
                    return new User() { Id = 0 };
                }

                // Authentication successful
                return user;
            }
            catch (Exception e)
            {
                throw new NotImplementedException(e.Message);
            }
        }

        // Verify password
        private bool VerifyPasswordHash(string password, string storedHash)
        {
            // Implement your own password hashing and validation logic here
            return password == storedHash;
        }
    }
}
