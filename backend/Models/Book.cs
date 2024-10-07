using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Book
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public int CategoryId { get; set; }
        public string? Summary { get; set; }
    }
}
