using backend.Dto;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/book")]
    //[Authorize]
    public class BookController : ControllerBase
    {
        private readonly BookService _service;

        public BookController(BookService service)
        {
            this._service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<BookDto>>> GetAllBooks()
        {
            return await _service.GetAllBooks();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBookById(int id)
        {
            var book = await _service.GetBookById(id);
            if (book == null)
            {
                return NotFound();
            }
            return book;
        }

        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook(Book book)
        {
            var cBook = await _service.CreateBook(book);
            return Ok(cBook);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBookById(int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }

            var uBook = await _service.UpdateBookById(id, book);
            if (uBook == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Book>> DeleteBookById(int id)
        {
            var dBook = await _service.DeleteBookById(id);
            if (dBook == null)
            {
                return NotFound();
            }
            return dBook;
        }
    }
}


