import React from 'react';
import css from '../../dist/style.css';
import Emoji from "./Emoji.jsx"
  
const ReviewList = (props) => {
   return(
     <div className ="jp-reviews-2-list">
      <div className = "jp-reviews-2-name">{props.review.name}</div>
 
    
    <div className = "jp-reviews-2-dates">{props.review.time} </div>
   
    <div className = "jp-reviews-2-description">""{props.review.description}</div>
   <div className ="jp-reviews-2-tripRating">
      <div>Trip Rating  </div>
      <div className="jp-reviews-2-rating-medium">
  <div className="jp-reviews-2-rating-medium-upper" style = {{width: `${props.review.score *20}%`}}><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span></div>
  <div className="jp-reviews-2-rating-medium-lower"><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span></div>
</div>
<div> {props.review.score}</div>

   </div>
   <div>{props.review.description} </div>
   <div className = "jp-reviews-2-customerRating"></div>
    
</div>
  
  )
}

export default ReviewList



