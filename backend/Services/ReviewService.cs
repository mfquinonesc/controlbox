using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{

    public class ReviewService : Service
    {
        public ReviewService(LibrarydbContext context) : base(context) { }

        public async Task<List<Review>> GetAllReviews()
        {
            return await _context.Reviews.ToListAsync();
        }

        public async Task<Review?> GetReviewById(int id)
        {
            return await _context.Reviews.FindAsync(id);
        }

        public async Task<Review?> DeleteReviewById(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review != null)
            {
                _context.Reviews.Remove(review);
                await _context.SaveChangesAsync();
            }
            return review;
        }

        public async Task<Review?> UpdateReviewById(int id, Review review)
        {
            var eReview = await _context.Reviews.FindAsync(id);
            if (eReview != null)
            {               
                eReview.BookId = review.BookId;
                eReview.UserId = review.UserId;
                eReview.Rating = review.Rating;
                eReview.Comment = review.Comment;
                eReview.ReviewDate = DateTime.Now;
                _context.Reviews.Update(eReview);
                await _context.SaveChangesAsync();
            }
            return eReview;
        }

        public async Task<Review> CreateReview(Review review)
        {
            review.ReviewDate = DateTime.UtcNow;
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();
            return review;
        }

        public async Task<List<Review>> GetReviewsByBookId(int bookId)
        {
            return await _context.Reviews.Where(r=> r.BookId == bookId).OrderByDescending(r => r.ReviewDate).ToListAsync();
        }

    }
}
