namespace backend.Dto
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Title { get; set; } 
        public string Author { get; set; } 
        public int CategoryId { get; set; }
        public string Category { get; set; }
        public string? Summary { get; set; }
    }
}
