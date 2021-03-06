import React from 'react';
import css from '../../dist/style.css';
import Emoji from "./Emoji.jsx"
  
const ReviewList = (props) => {
   return(
     <div className ="jp-reviews-2-list">
      <div className = "jp-reviews-2-name">{props.review.name}</div>
 
    
    <div className = "jp-reviews-2-dates">{props.review.time} </div>
   
   <div className = "jp-reviews-2-quotes">
     <div className = "jp-reviews-2-quotes-quote jp-reviews-2-quotes-transform">"</div>
     <div className ="jp-reviews-2-quotes-info">{props.review.quotes}</div>
     <div className ="jp-reviews-2-quotes-quote" >"</div>
   </div>
   <div className ="jp-reviews-2-tripRating">
      <div className="jp-reviews-2-tripRating-title"> Trip Rating  </div>
      <div className="jp-reviews-2-rating-medium">
  <div className="jp-reviews-2-rating-medium-upper" style = {{width: `${props.review.score *20}%`}}><span className="jp-star-margins-2">★</span><span className="jp-star-margins-2">★</span><span className="jp-star-margins-2">★</span><span className="jp-star-margins-2">★</span><span className="jp-star-margins-2">★</span></div>
  <div className="jp-reviews-2-rating-medium-lower"><span className="jp-star-margins-2">★</span><span className="jp-star-margins-2">★</span><span className="jp-star-margins-2">★</span><span className="jp-star-margins-2">★</span><span className="jp-star-margins-2">★</span></div>
</div>
<div className = "bubble"> {props.review.score}</div>
</div>
    <div className = "jp-reviews-2-description">{props.review.description}</div>
    <div className ="jp-reviews-2-tripRating">
      <div className="jp-reviews-2-tripRating-title"> Customer Experience  </div>
      <div className="jp-reviews-2-rating-medium">
  <div className="jp-reviews-2-rating-medium-upper" style = {{width: `${props.review.customerScore *20}%`}}><span className="jp-star-margins-2">★</span><span className="jp-star-margins-2">★</span><span className="jp-star-margins-2">★</span><span className="jp-star-margins-2">★</span><span className="jp-star-margins-2">★</span></div>
  <div className="jp-reviews-2-rating-medium-lower"><span className="jp-star-margins-2">★</span><span className="jp-star-margins-2">★</span><span className="jp-star-margins-2">★</span><span className="jp-star-margins-2">★</span><span className="jp-star-margins-2">★</span></div>
</div>
<div className = "bubble"> {props.review.customerScore}</div>
</div>
    <div className = "jp-reviews-2-description">{props.review.customerReview}</div>
    
</div>
  
  )
}

export default ReviewList

const[current, setCurrent] =React.useState(0)
setCurrent(count +1);