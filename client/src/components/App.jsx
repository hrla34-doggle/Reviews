import React from 'react';
import css from '../../dist/style.css';

import axios from 'axios';
import ReviewList from './ReviewList.jsx'

class App extends React.Component {
  constructor(props){
    super(props);
    this.reviewRef = React.createRef();
    this.state = {
      reviews: [],
      newest: [],
      popular: [],
      averageScore: 0,
      indexStart: 0,
      indexEnd: 10,
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
            averagedScore += data.data.review[i].score;
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
          <div className = "jp-review">
            <div className = "jp-title">Hawaiian Explorer Premium Trip Reviews</div>
          <div className = "jp-subtitle"> Reviews</div>
          <div className="jp-large-star-ratings-css">
          <div className="jp-large-star-ratings-css-top" style = {{width: `${this.state.averageScore *20}%`}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
          <div className="jp-large-star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
          </div>
          <div className="jp-average-score">{this.state.averageScore}/5</div>
          <div className = "jp-number-of-reviews">Independent Feedback based on {this.state.reviews.length} verified reviews</div>
       
          <div className = "jp-review-padding">
            <button className = {this.state.newestButton} onClick = {this.newestList}>Newest</button>
            <button className = {this.state.popularButton} onClick = {this.popularList}>Popular</button>
          </div>
          < div ref ={this.reviewRef} />
              {this.state.reviews.slice(this.state.indexStart, this.state.indexEnd).map((review) => (
              <ReviewList review = {review}     
               />
              ))}
              
              {/* <div className = "jp-review-bottom"> */}
              {/* <div className = "jp-review-promo">by Jonathan Parker</div> */}
              <div className = "jp-review-button-bar">
               {this.state.showFirst ? <button className = "jp-review-buttons" onClick = {this.first}> First </button> : null}
               {this.state.showPrevious ? <button className = "jp-review-buttons" onClick = {this.previous}> Previous </button> : null}
               {this.state.showNext ? <button className = "jp-review-buttons" onClick ={this.next}>Next</button> : null}
              
               
          {/* </div> */}
          </div>
      </div>
      )
  }
}
  
export default App;