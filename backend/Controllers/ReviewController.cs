using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/review")]
    public class ReviewController : ControllerBase
    {
        private readonly ReviewService _service;

        public ReviewController(ReviewService service)
        {
            this._service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<Review>>> GetAllReviews()
        {
            return await _service.GetAllReviews();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReviewById(int id)
        {
            var review = await _service.GetReviewById(id);
            if (review == null)
            {
                return NotFound();
            }
            return review;
        }

        [HttpGet("book/{bookId}")]
        public async Task<ActionResult<List<Review>>> GetReviewsByBookId(int bookId)
        {
            List<Review> reviews =await _service.GetReviewsByBookId(bookId);
            return Ok(reviews);
        }

        [HttpPost]
        public async Task<ActionResult<Review>> CreateReview(Review review)
        {
            var cReview = await _service.CreateReview(review);
            return Ok(cReview);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReviewById(int id, Review review)
        {
            if (id != review.Id || id == 0)            
                return BadRequest();            

            var uReview = await _service.UpdateReviewById(id, review);
            if (uReview == null)            
                return NotFound();            

            return Ok(uReview);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Review>> DeleteReviewById(int id)
        {
            var dReview = await _service.DeleteReviewById(id);
            if (dReview == null)
            {
                return NotFound();
            }
            return dReview;
        }
    }
}
