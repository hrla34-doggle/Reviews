import React from 'react';
import css from '../../dist/style.css';

import axios from 'axios';
import ReviewList from './ReviewList.jsx'

class UpdatedApp extends React.Component {
  constructor(props){
    super(props);
    this.reviewRef = React.createRef();
    this.state = {
      reviews: [],
      newest: [],
      popular: [],
      averageScore: 0,
      indexStart: 0,
      indexEnd: 1,
      isPressed: false,
      popularButton: "jp-notClicked",
      newestButton: "jp-clicked",
      showPrevious: false,
      showFirst: false,
      showNext: true
    }
      this.getList = this.getList.bind(this);
      this.next = this.next.bind(this);
      this.newestList = this.newestList.bind(this);
      this.popularList = this.popularList.bind(this);
      this.previous = this.previous.bind(this);
      this.first = this.first.bind(this);
      this.scrollToRef = this.scrollToRef.bind(this);
    //   this.itemClickSelection = this.itemClickSelection.bind(this);
    //   this.postItem = this.postItem.bind(this);
    //   this.updateItem = this.updateItem.bind(this);
      
  }

  componentDidMount() {
    this.getList();
    // this.reviewRef.current.focus();
  }
  scrollToRef = () => window.scrollTo({left: 0, top: this.reviewRef.current.offsetTop, behavior: 'smooth'}) 

  getList() {
    axios
    .get('/api') 
    .then((data) => {
        let averagedScore = 0;
        let tempTime = 0;
        for (var i = 0; i < data.data.length; i++) {
            averagedScore += data.data[i].score;
            if (data.data[i].time <60) {
                data.data[i].time = data.data[i].time + " seconds ago";
            }
            else if (data.data[i].time >= 60  && data.data[i].time < 3600) {
                tempTime = data.data[i].time % 59;
                data.data[i].time = tempTime + " minutes ago";
            }
            else if (data.data[i].time >= 3600 && data.data[i].time < 86400) {
                tempTime = Math.floor(data.data[i].time / 3600);
                data.data[i].time = tempTime + " hours ago"; 
            }
            else if (data.data[i].time >= 86400 && data.data[i].time < 2592000) {
                tempTime = Math.floor(data.data[i].time / 86400);
                data.data[i].time = tempTime + " days ago"; 
            }
            else if (data.data[i].time >= 2592000 && data.data[i].time < 31104000) {
                tempTime = Math.floor(data.data[i].time / 2592000);
                data.data[i].time = tempTime + " months ago"; 
            }
            else if (data.data[i].time >= 31104000) {
                tempTime = Math.floor(data.data[i].time / 31104000);
                data.data[i].time = tempTime + " years ago"; 
            }
        }
        averagedScore = parseFloat(averagedScore / (data.data.length +1)).toFixed(1);
        let popularSorted = data.data.slice().sort(function(a, b) { 
          return b.likes - a.likes;
        });
      this.setState({
        reviews: data.data,
        newest: data.data,
        popular: popularSorted,
        averageScore: averagedScore,
        })
    })
    .catch((err) => {
      console.error(err)
    })
  }

next() {
  if (this.state.indexEnd === 20) {
    this.setState({
      indexStart: this.state.indexStart+10,
      indexEnd: this.state.indexEnd +10,
      showPrevious: true,
      showFirst: true
    });
  }
  else if (this.state.reviews.length- this.state.indexEnd > 10) {
  this.setState({
    indexStart: this.state.indexStart+10,
    indexEnd: this.state.indexEnd +10,
    showPrevious: true
  });
}
else {
  this.setState({
    indexStart: this.state.indexStart+10,
    indexEnd: this.state.indexEnd +10,
    showNext: false
  })
}
  this.scrollToRef();
}
previous() {
  if (this.state.indexStart === 10) {
  this.setState({
    indexStart: this.state.indexStart -10,
    indexEnd: this.state.indexEnd -10,
    showPrevious: false,
  })
}
else if (this.state.indexStart ===20) {
  this.setState({
    indexStart: this.state.indexStart -10,
    indexEnd: this.state.indexEnd -10,
    showFirst: false,
  })

}
else {
  this.setState({
    indexStart: this.state.indexStart -10,
    indexEnd: this.state.indexEnd -10,
    showNext: true  
  })

}
this.scrollToRef();
}

first() {
  this.setState({
    indexStart: 0,
    indexEnd: 10,
    showNext: true,
    showPrevious: false,
    showFirst: false
  })
this.scrollToRef();
}
newestList() { 
  this.setState({
    reviews: this.state.newest,
    indexStart: 0,
    indexEnd: 10,
    popularButton: "jp-notClicked",
    newestButton: "jp-clicked"
  })
  this.scrollToRef();
}
popularList() {
  this.setState({
    reviews: this.state.popular,
    indexStart: 0,
    indexEnd: 10,
    popularButton: "jp-clicked",
    newestButton: "jp-notClicked"
  })
  this.scrollToRef();
}


  render() {
      return(
          <div className = "jp-review-2-container">
              <div className = "jp-review-2-filler">
                  <div className = "jp-reviews-2-designs">JP Designs</div>
              </div>
              <div className = "jp-review-2-slogan">LIVE UNEDITED &amp; INDEPENDENT TRAVELLERS REVIEWS</div>
            <div className = "jp-reviews-2-title">Hawaiian Explorer Premium Trip Reviews</div>
          <div className = "jp-reviews-2-staticDescription">Our guests are at the heart of everything we do, their feedback fuels our innovation, inspiring us to improve continuously and craft Simply The Best vacations. That's why we ask each of our guests to leave a third-party verified, independent review after every trip. As testament to our commitment we have been given the Trusted Service Award from Jonathan Parker, recognising we deliver exceptional experiences as rated by real guests.</div>
          <div className = "jp-reviews-2-inner-container">
            <div className = "jp-reviews-2-boxOne">
                <div className = "jp-reviews-2-boxOne-row-1">Overall Rating</div>
                <div className = "jp-reviews-2-bs jp-reviews-2-box-padding">{this.state.averageScore}</div>
                <div className = "jp-reviews-2-boxOne-row-3">OUT OF 5</div>
                <div className = "jp-reviews-2-rating">
                <div className = "jp-reviews-2-rating-upper" style = {{width: `${this.state.averageScore *20}%`}}>
                <span>★</span>
                 <span>★</span>
                <span>★</span>
                 <span>★</span>
                 <span>★</span></div>
                <div className = "jp-reviews-2-rating-lower">
                <span>★</span>
                 <span>★</span>
                <span>★</span>
                 <span>★</span>
                 <span>★</span></div>
                </div>
                <div className = "jp-reviews-2-boxOne-lastRow">Based on {this.state.reviews.length} independent reviews</div>
            </div>
            <div className = "jp-reviews-2-boxTwoThree">
                <div className = "jp-reviews-2-boxTwoThree-row-1">Trip Rating</div>
                <div className = "jp-reviews-2-boxTwoThree-row-2">Trip rating is the overall quality of the intinerary and trip</div>
                <div className = "jp-reviews-2-boxTwoThree-row-3">
                    <div className = "jp-reviews-2-boxTwoThree-row3-row-1">
                        <div className = "jp-reviews-2-boxTwoThree-row3-row-1-column-1">{this.state.averageScore}</div>
                        <div className = "jp-reviews-2-boxTwoThree-row3-row-1-column-2">OUT OF 5</div>
                        <div className="jp-reviews-2-rating-lowest">
                             <div className="jp-reviews-2-rating-lowest-upper" style = {{width: `${this.state.averageScore *20}%`}}><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span></div>
                             <div className="jp-reviews-2-rating-lowest-lower"><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span></div>
                        </div>
                    
                    </div>
                    <div className = "jp-reviews-2-boxTwoThree-row3-row-2-col-1">
                        <div className = "jp-reviews-2-bars-space">5</div>
                        <div>4</div>
                        <div>3</div>
                        <div>2</div>
                        <div>1</div>
                    </div>
                    <div className = "jp-reviews-2-boxTwoThree-row3-row-2-col-2"> 
                    <div >★</div>
                    <div>★</div>
                    <div>★</div>
                    <div>★</div>
                    <div>★</div>
                    </div>
                    <div className = "jp-reviews-2-boxTwoThree-row3-row-3-col-1">
                        <div className = "jp-reviews-2-bars-fill" style = {{width: `${this.state.averageScore *20}%`}}>d</div>
                        <div>2</div>
                    </div>
                </div>
            </div>
            <div className = "jp-reviews-2-boxTwoThree">HI</div>

          </div> 
          <div>Lines Inner row divs</div>
          <div className = "jp-reviews-2-inner-slider">

          <div className = "jp-reviews-2-previous" onClick = {this.previous}> 
          <i className = "jp-reviews-2-arrow-left"></i> </div>
            <div className = "jp-reviews-2-slider-wrapper"> 
              {this.state.reviews.slice(this.state.indexStart, this.state.indexEnd).map((review) => (
              <ReviewList review = {review}     
               />
              ))}
              
              </div>
              <div className = "jp-reviews-2-next" onClick = {this.previous}> 
          <i className = "jp-reviews-2-arrow-right"></i> </div>
          </div>

          
         
      </div>
      )
  }
}
  
export default UpdatedApp