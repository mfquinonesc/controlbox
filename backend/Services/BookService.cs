using backend.Data;
using backend.Dto;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{

    public class BookService : Service
    {
        public BookService(LibrarydbContext context) : base(context) {  }

        public async Task<List<BookDto>> GetAllBooks()
        {
            List<BookDto> bookDtos = new List<BookDto>();
            var categories = _context.Categories;
            var books = await _context.Books.ToListAsync();

            if(books != null && categories != null)
            {
                foreach (var item in books)
                {
                    BookDto bookDto = new BookDto();
                    bookDto.Id = item.Id;
                    bookDto.Title = item.Title;
                    bookDto.Author = item.Author;
                    bookDto.CategoryId = item.CategoryId;
                    bookDto.Summary = item.Summary;
                    var category = categories.Where(c => c.Id == item.CategoryId).FirstOrDefault();
                    bookDto.Category = category != null ? category.Name : "";
                    bookDtos.Add(bookDto);
                }
            }
           
            return bookDtos;
        }

        public async Task<Book?> GetBookById(int id)
        {
            return await _context.Books.FindAsync(id);
        }

        public async Task<Book?> DeleteBookById(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book != null)
            {
                _context.Books.Remove(book);
                await _context.SaveChangesAsync();
            }
            return book;
        }

        public async Task<Book?> UpdateBookById(int id, Book book)
        {
            var eBook = await _context.Books.FindAsync(id);
            if (eBook != null)
            {               
                eBook.Title = book.Title;
                eBook.Author = book.Author;
                eBook.CategoryId = book.CategoryId;
                eBook.Summary = book.Summary;
                _context.Books.Update(eBook);
                await _context.SaveChangesAsync();
            }
            return eBook;
        }

        public async Task<Book> CreateBook(Book book)
        {
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
            return book;
        }
    }
}

