import React from 'react';
import css from '../../dist/style.css';
import Emoji from "./Emoji.jsx"
  
const ReviewList = (props) => {
   return(
    <div className ="jp-review-list">
    <div className="jp-star-ratings-css">
  <div className="jp-star-ratings-css-top" style = {{width: `${props.review.score *20}%`}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
  <div className="jp-star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
</div>

    <div className = "jp-name">{props.review.name}</div>
    <div className = "jp-dates">- {props.review.time} </div>
    <div className = "jp-description">{props.review.description}</div>
    <div className = "jp-review-emoji"><Emoji symbol ="👍"/>{props.review.likes}</div>
    
</div>
  
  )
}

export default ReviewList


