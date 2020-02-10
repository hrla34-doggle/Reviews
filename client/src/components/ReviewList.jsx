import React from 'react';
import css from '../../dist/style.css';
import Emoji from "./Emoji.jsx"
  
const ReviewList = (props) => {
   return(
     <div className ="jp-reviews-2-list">
       <div className = "jp-reviews-2-name-wrapper">
         <div className = "jp-reviews-2-name-icon"> 
           <img src ="https://fec-hrla.s3-us-west-1.amazonaws.com/PNG/icon.png" height ="15px" width ="15px" ></img>
         </div>
       <div className = "jp-reviews-2-name">{props.review.name}</div>
       </div>
      
      <div className = "jp-reviews-2-border"></div>
    
    <div className = "jp-reviews-2-dates-wrapper">
      <div className = "jp-reviews-2-dates-svg">
      <object type = "image/svg+xml" data="https://fec-hrla.s3-us-west-1.amazonaws.com/FEC+SVG/clock2.svg" height = "17px" width = "17px" className = "jp-reviews-2-dates-svg"></object>
      </div>     
      <div className = "jp-reviews-2-dates">{props.review.time} 
      </div>
    </div>
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
    <div className = "jp-reviews-2-description jp-reviews-2-noSelect">&nbsp;</div>
</div>
  
  )
}

export default ReviewList



