using backend.Data;

namespace backend.Services
{
    public class Service
    {
        protected readonly LibrarydbContext _context;
        public Service(LibrarydbContext context)
        {
            this._context = context;
        }
    }
}
