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
      tripRating: 0,
      customerRating: 0,
      tripFive: 0,
      tripFour: 0,
      tripThree: 0,
      tripTwo: 0,
      tripOne: 0,
      customerFive: 0,
      customerFour: 0,
      customerThree: 0,
      customerTwo: 0,
      customerOne: 0,
      indexStart: 0,
      indexEnd: 1,
      isPressed: false,
      popularButton: "jp-notClicked",
      newestButton: "jp-clicked",
      showPrevious: false,
      showFirst: false,
      showNext: true,
      country: ""
    }
      this.getList = this.getList.bind(this);
      this.next = this.next.bind(this);
      this.newestList = this.newestList.bind(this);
      this.popularList = this.popularList.bind(this);
      this.previous = this.previous.bind(this);
      this.first = this.first.bind(this);
    //   this.scrollToRef = this.scrollToRef.bind(this);
    //   this.itemClickSelection = this.itemClickSelection.bind(this);
    //   this.postItem = this.postItem.bind(this);
    //   this.updateItem = this.updateItem.bind(this);
      
  }

  componentDidMount() {
    this.getList();
    // this.reviewRef.current.focus();
  }
//   scrollToRef = () => window.scrollTo({left: 0, top: this.reviewRef.current.offsetTop, behavior: 'smooth'}) 

  getList() {
    
    var url = window.location.href.toString().split('/');
    console.log(url);
    let urlid = url.slice(url.length-1);
    console.log(urlid);
    let id = 1;

    axios
    .get(`/api/${id}`) 
    .then((data) => {
        let averagedScore = 0;
        let tripAverage = 0;
        let customerAverage = 0;
        let customerScore = 0;
        let tripScore = 0;
        let tempTime = 0;
        let customerScoreFive = 0;
        let customerScoreFour = 0;
        let customerScoreThree = 0;
        let customerScoreTwo = 0;
        let customerScoreOne = 0;
        let tripScoreFive = 0;
        let tripScoreFour = 0;
        let tripScoreThree = 0;
        let tripScoreTwo = 0;
        let tripScoreOne = 0;
        data.data.review.sort(function(a, b) { 
          return a.time - b.time;
        });
        for (var i = 0; i < data.data.review.length; i++) {
            
             tripScore += data.data.review[i].score;
             customerScore += data.data.review[i].customerScore;
             if (data.data.review[i].score === 5) {
                 tripScoreFive++;
             }
             if (data.data.review[i].score === 4) {
                tripScoreFour++;
            }
            if (data.data.review[i].score === 3) {
                tripScoreThree++;
            }
            if (data.data.review[i].score === 2) {
                tripScoreTwo++;
            }
            if (data.data.review[i].score === 1) {
                tripScoreOne++;
            }
            if (data.data.review[i].customerScore === 5) {
                customerScoreFive++;
            }
            if (data.data.review[i].customerScore === 4) {
                customerScoreFour++;
           }
           if (data.data.review[i].customerScore === 3) {
                customerScoreThree++;
           }
           if (data.data.review[i].customerScore === 2) {
               customerScoreTwo++;
           }
           if (data.data.review[i].customerScore === 1) {
               customerScoreOne++;
           }
            if (data.data.review[i].time <60) {
                data.data.review[i].time = data.data.review[i].time + " seconds ago";
            }
            else if (data.data.review[i].time >= 60  && data.data.review[i].time < 3600) {
                tempTime = data.data.review[i].time % 59;
                data.data.review[i].time = tempTime + " minutes ago";
            }
            else if (data.data.review[i].time >= 3600 && data.data.review[i].time < 86400) {
                tempTime = Math.floor(data.data.review[i].time / 3600);
                data.data.review[i].time = tempTime + " hours ago"; 
            }
            else if (data.data.review[i].time >= 86400 && data.data.review[i].time < 2592000) {
                tempTime = Math.floor(data.data.review[i].time / 86400);
                data.data.review[i].time = tempTime + " days ago"; 
            }
            else if (data.data.review[i].time >= 2592000 && data.data.review[i].time < 31104000) {
                tempTime = Math.floor(data.data.review[i].time / 2592000);
                data.data.review[i].time = tempTime + " months ago"; 
            }
            else if (data.data.review[i].time >= 31104000) {
                tempTime = Math.floor(data.data.review[i].time / 31104000);
                data.data.review[i].time = tempTime + " years ago"; 
            }
        }
        tripAverage = parseFloat( tripScore/ (data.data.review.length)).toFixed(1);
        customerAverage = parseFloat(customerScore / (data.data.review.length)).toFixed(1);
        averagedScore = parseFloat((tripScore + customerScore) / (data.data.review.length *2)).toFixed(1);
        let popularSorted = data.data.review.slice().sort(function(a, b) { 
          return b.likes - a.likes;
        });
      this.setState({
        reviews: data.data.review,
        newest: data.data.review,
        popular: popularSorted,
        averageScore: averagedScore,
        tripRating: tripAverage,
        customerRating: customerAverage,
        tripFive: tripScoreFive,
        tripFour: tripScoreFour,
        tripThree: tripScoreThree,
        tripTwo: tripScoreTwo,
        tripOne: tripScoreOne,
        customerFive: customerScoreFive,
        customerFour: customerScoreFour,
        customerThree: customerScoreThree,
        customerTwo: customerScoreTwo,
        customerOne: customerScoreOne,
        country: data.data.trips,
        })
    })
    .catch((err) => {
      console.error(err)
    })
  }

next() {
  if (this.state.indexEnd === this.state.reviews.length-1) {
    this.setState({
      indexStart: this.state.indexStart +1,
      indexEnd: this.state.indexEnd +1,
      showPrevious: true,
      showNext: false 
    });
  }
  else if (this.state.indexEnd === 1) {
  this.setState({
    indexStart: this.state.indexStart+1,
    indexEnd: this.state.indexEnd +1,
    showPrevious: true,
  });
}
else {
    this.setState({
      indexStart: this.state.indexStart+1,
      indexEnd: this.state.indexEnd +1,
    });
  }
  }
previous() {
  if (this.state.indexStart === 1) {
  this.setState({
    indexStart: this.state.indexStart -1,
    indexEnd: this.state.indexEnd -1,
    showPrevious: false,
  })
}
else if (this.state.indexStart > 1) {
  this.setState({
    indexStart: this.state.indexStart -1,
    indexEnd: this.state.indexEnd -1,
    showNext: true,
        })
    }
}

first() {
  this.setState({
    indexStart: 0,
    indexEnd: 1,
    showNext: true,
    showPrevious: false,
    showFirst: false
  })

}
newestList() { 
  this.setState({
    reviews: this.state.newest,
    indexStart: 0,
    indexEnd: 10,
    popularButton: "jp-notClicked",
    newestButton: "jp-clicked"
  })
  
}
popularList() {
  this.setState({
    reviews: this.state.popular,
    indexStart: 0,
    indexEnd: 10,
    popularButton: "jp-clicked",
    newestButton: "jp-notClicked"
  })

}


  render() {
      return(
          <div className = "jp-review-2-container">
              <div className = "jp-review-2-filler">
                  <div className = "jp-reviews-2-designs">JP Designs</div>
              </div>
              <div className = "jp-review-2-slogan">LIVE UNEDITED &amp; INDEPENDENT TRAVELLERS REVIEWS</div>
            <div className = "jp-reviews-2-title">{this.state.country} Explorer Premium Trip Reviews</div>
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
                        <div className = "jp-reviews-2-boxTwoThree-row3-row-1-column-1">{this.state.tripRating}</div>
                        <div className = "jp-reviews-2-boxTwoThree-row3-row-1-column-2">OUT OF 5</div>
                        <div className="jp-reviews-2-rating-lowest">
                             <div className="jp-reviews-2-rating-lowest-upper" style = {{width: `${this.state.tripRating *20}%`}}><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span></div>
                             <div className="jp-reviews-2-rating-lowest-lower"><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span></div>
                        </div>
                    
                    </div>
                    <div className = "jp-reviews-2-boxTwoThree-row3-row-2-col-1">
                        <div className = "jp-reviews-2-bars-space">5</div>
                        <div className = "jp-reviews-2-bars-space">4</div>
                        <div className = "jp-reviews-2-bars-space">3</div>
                        <div className = "jp-reviews-2-bars-space">2</div>
                        <div className = "jp-reviews-2-bars-space">1</div>
                    </div>
                    <div className = "jp-reviews-2-boxTwoThree-row3-row-2-col-2"> 
                    <div className = "jp-reviews-2-bars-space">★</div>
                    <div className = "jp-reviews-2-bars-space">★</div>
                    <div className = "jp-reviews-2-bars-space">★</div>
                    <div className = "jp-reviews-2-bars-space">★</div>
                    <div className = "jp-reviews-2-bars-space">★</div>
                    </div>
                    <div className = "jp-reviews-2-boxTwoThree-row3-row-3-col-1">
                        <div className = "jp-reviews-2-bars"> 
                        <div className = "jp-reviews-2-bars-fill jp-reviews-2-bars-space" style = {{width: `${((this.state.tripFive) / this.state.reviews.length) *100}%`}}></div>
                        </div>
                        <div className = "jp-reviews-2-bars"> 
                        <div className = "jp-reviews-2-bars-fill jp-reviews-2-bars-space" style = {{width: `${((this.state.tripFour) / this.state.reviews.length) *100}%`}}></div>
                        </div>
                        <div className = "jp-reviews-2-bars"> 
                        <div className = "jp-reviews-2-bars-fill jp-reviews-2-bars-space" style = {{width: `${((this.state.tripThree) / this.state.reviews.length) *100}%`}}></div>
                        </div>
                        <div className = "jp-reviews-2-bars"> 
                        <div className = "jp-reviews-2-bars-fill jp-reviews-2-bars-space" style = {{width: `${((this.state.tripTwo) / this.state.reviews.length) *100}%`}}></div>
                        </div>
                        <div className = "jp-reviews-2-bars"> 
                        <div className = "jp-reviews-2-bars-fill jp-reviews-2-bars-space" style = {{width: `${((this.state.tripOne) / this.state.reviews.length) *100}%`}}></div>
                        </div>
                    </div>
                    <div className = "jp-reviews-2-boxTwoThree-row3-row-4-col-1">
                        <div className = "jp-reviews-2-bars-space">{this.state.tripFive}</div>
                        <div className = "jp-reviews-2-bars-space">{this.state.tripFour}</div>
                        <div className = "jp-reviews-2-bars-space">{this.state.tripThree}</div>
                        <div className = "jp-reviews-2-bars-space">{this.state.tripTwo}</div>
                        <div className = "jp-reviews-2-bars-space">{this.state.tripOne}</div>

                    </div>
                </div>
            </div>
            <div className = "jp-reviews-2-boxTwoThree">
                <div className = "jp-reviews-2-boxTwoThree-row-1">Customer Experience</div>
                <div className = "jp-reviews-2-boxTwoThree-row-2">Customer experience is the standard of service<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
                <div className = "jp-reviews-2-boxTwoThree-row-3">
                    <div className = "jp-reviews-2-boxTwoThree-row3-row-1">
                        <div className = "jp-reviews-2-boxTwoThree-row3-row-1-column-1">{this.state.customerRating}</div>
                        <div className = "jp-reviews-2-boxTwoThree-row3-row-1-column-2">OUT OF 5</div>
                        <div className="jp-reviews-2-rating-lowest">
                             <div className="jp-reviews-2-rating-lowest-upper" style = {{width: `${this.state.customerRating *20}%`}}><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span></div>
                             <div className="jp-reviews-2-rating-lowest-lower"><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span><span className="jp-star-margins">★</span></div>
                        </div>
                    
                    </div>
                    <div className = "jp-reviews-2-boxTwoThree-row3-row-2-col-1">
                        <div className = "jp-reviews-2-bars-space">5</div>
                        <div className = "jp-reviews-2-bars-space">4</div>
                        <div className = "jp-reviews-2-bars-space">3</div>
                        <div className = "jp-reviews-2-bars-space">2</div>
                        <div className = "jp-reviews-2-bars-space">1</div>
                    </div>
                    <div className = "jp-reviews-2-boxTwoThree-row3-row-2-col-2"> 
                    <div className = "jp-reviews-2-bars-space">★</div>
                    <div className = "jp-reviews-2-bars-space">★</div>
                    <div className = "jp-reviews-2-bars-space">★</div>
                    <div className = "jp-reviews-2-bars-space">★</div>
                    <div className = "jp-reviews-2-bars-space">★</div>
                    </div>
                    <div className = "jp-reviews-2-boxTwoThree-row3-row-3-col-1">
                        <div className = "jp-reviews-2-bars"> 
                        <div className = "jp-reviews-2-bars-fill jp-reviews-2-bars-space" style = {{width: `${((this.state.customerFive) / this.state.reviews.length) *100}%`}}></div>
                        </div>
                        <div className = "jp-reviews-2-bars"> 
                        <div className = "jp-reviews-2-bars-fill jp-reviews-2-bars-space" style = {{width: `${((this.state.customerFour) / this.state.reviews.length) *100}%`}}></div>
                        </div>
                        <div className = "jp-reviews-2-bars"> 
                        <div className = "jp-reviews-2-bars-fill jp-reviews-2-bars-space" style = {{width: `${((this.state.customerThree) / this.state.reviews.length) *100}%`}}></div>
                        </div>
                        <div className = "jp-reviews-2-bars"> 
                        <div className = "jp-reviews-2-bars-fill jp-reviews-2-bars-space" style = {{width: `${((this.state.customerTwo) / this.state.reviews.length) *100}%`}}></div>
                        </div>
                        <div className = "jp-reviews-2-bars"> 
                        <div className = "jp-reviews-2-bars-fill jp-reviews-2-bars-space" style = {{width: `${((this.state.customerOne) / this.state.reviews.length) *100}%`}}></div>
                        </div>
                    </div>
                    <div className = "jp-reviews-2-boxTwoThree-row3-row-4-col-1">
                        <div className = "jp-reviews-2-bars-space">{this.state.customerFive}</div>
                        <div className = "jp-reviews-2-bars-space">{this.state.customerFour}</div>
                        <div className = "jp-reviews-2-bars-space">{this.state.customerThree}</div>
                        <div className = "jp-reviews-2-bars-space">{this.state.customerTwo}</div>
                        <div className = "jp-reviews-2-bars-space">{this.state.customerOne}</div>

                    </div>
                </div>
            </div>

          </div> 
          <div>Lines Inner row divs</div>
          <div className = "jp-reviews-2-inner-slider">

          {this.state.showPrevious ? <div className = "jp-reviews-2-previous" onClick = {this.previous}> 
          <i className = "jp-reviews-2-arrow-left"></i> </div> : <div className = "jp-reviews-2-previous-empty"></div>}
            <div className = "jp-reviews-2-slider-wrapper"> 
              {this.state.reviews.slice(this.state.indexStart, this.state.indexEnd).map((review) => (
              <ReviewList review = {review}     
               />
              ))}
              
              </div>
              {this.state.showNext ? <div className = "jp-reviews-2-next" onClick = {this.next}> 
          <i className = "jp-reviews-2-arrow-right"></i> </div> :<div className = "jp-reviews-2-next-empty"></div> }
          </div>
 
          
         
      </div>
      )
  }
}
  
export default UpdatedApp