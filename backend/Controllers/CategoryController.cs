using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/category")]
    [Authorize]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService _service;

        public CategoryController(CategoryService service)
        {
            this._service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetAllCategories()
        {
            return await _service.GetAllCategories();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategoryById(int id)
        {
            var category = await _service.GetCategoryById(id);
            if (category == null)
            {
                return NotFound();
            }
            return category;
        }

        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategory(Category category)
        {
            var cCategory = await _service.CreateCategory(category);
            return Ok(cCategory);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategoryById(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            var uCategory = await _service.UpdateCategoryById(id, category);
            if (uCategory == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> DeleteCategoryById(int id)
        {
            var dCategory = await _service.DeleteCategoryById(id);
            if (dCategory == null)
            {
                return NotFound();
            }

            return dCategory;
        }
    }
}
