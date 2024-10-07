using backend.Models;

namespace backend.Dto
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public int CategoryId { get; set; }
        public string? Summary { get; set; }
        public string Category { get; set; }

    }
}
