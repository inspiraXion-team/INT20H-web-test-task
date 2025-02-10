import React, { useState } from 'react';
import './Quest.css';

const Quest = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement comment submission logic
    console.log('Submitted comment:', comment);
  };

  return (
    <div className="quest-container">
      <div className="quest-header">
        <h1>Name of quest...</h1>
        <div className="quest-meta">
          <span>Time left: 00:00</span>
        </div>
      </div>

      <div className="quest-content">
        <div className="quest-map">
          {[1, 2, 3, 4, 5, 6].map((point) => (
            <div 
              key={point} 
              className={`map-point point-${point}`}
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`
              }}
            >
              {point}
            </div>
          ))}
        </div>
      </div>

      <div className="quest-comment-section">
        <form onSubmit={handleCommentSubmit} className="add-comment-form">
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? 'active' : ''}`}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            placeholder="Add comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="comment-textarea"
          ></textarea>
          <button type="submit" className="comment-submit-btn">Publish</button>
        </form>

        <div className="comments-list">
          <div className="comment">
            <div className="comment-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="star active">★</span>
              ))}
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quest;