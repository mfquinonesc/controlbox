using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;


namespace backend.Services
{
    public class CategoryService : Service
    {
        public CategoryService(LibrarydbContext context) : base(context) { }

        public async Task<List<Category>> GetAllCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category?> GetCategoryById(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<Category?> DeleteCategoryById(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category != null)
            {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
            }
            return category;
        }

        public async Task<Category?> UpdateCategoryById(int id, Category category)
        {
            var eCategory = await _context.Categories.FindAsync(id);
            if (eCategory != null)
            {
                eCategory.Name = category.Name;
                _context.Categories.Update(eCategory);
                await _context.SaveChangesAsync();
            }
            return eCategory;
        }

        public async Task<Category> CreateCategory(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return category;
        }
    }
}

