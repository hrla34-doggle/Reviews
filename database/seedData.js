const Reviews = require('./');
var mongoose = require('mongoose');

const quotes = ["AMAZING!!!!!!", "We had a blast", "The tour guides made this trip", "Travel Fever", "I wish I could have gone, but HR took up my life", "Save me", "I was distracted by the latest thing Trump did"]
const trips = ['Egypt', 'Kenya', 'Morocco', 'South Africa','China', 'Israel', 'India', 'Japan', 'South Korea', 'Thailand', 'Vietnam','France', 'Germany', 'Greece', 'Ireland', 'Italy', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Russia', 'Spain', 'Switzerland', 'United Kingdom','United States', 'Costa Rica', 'Mexico', 'Canada','Brazil', 'Peru', 'Australia', 'New Zealand', 'Colombia'];
const firstName = ['Jonathan', 'Sam', 'Brian', "Steven", "Shawn", "Eric", "Allen", "Matt", "Sarah", "Monique", "Evelyn", "Lindsey", "Gerard", "Ray", "Mikey", "Frank", "Shana", "Shala", "Sherry", "Sue", "Rose", "David"];
const lastName = ['Smith', 'Adams', 'Parker', 'Windsor', 'Markyle', 'Tuttle', 'McCormick', "Boswell", "Magnier", "Doyle", "Kennedy", "Hill", "Jones", "Wilson", 'Stark', "King", "Lopez", "Cook", "Henderson", "Bailey"];
const first = ['I', 'We', 'My parents', "My kids", "My grandparents", "My wife", "My Husband", "I", "I"];
const second = [['hated', 1], ['loved', 5], ['enjoyed', 4], ["disliked", 2], ["felt iffy about", 3]]
const third = ["this venue", "this house", "the accomodations", "the trip"]
const customer = [["They really took care of us", 4], ["Trafalger gave us a smooth experience", 4], ["We loved the customer service on our adventure!", 5], ["The booking experience was great", 5], ["Trafalger lost our booking!!!", 1], ["A representative at Trafalger made me cry on the phone", 1], ["Trafalger had some hidden fees", 2], ["the service was ok", 3], ["Nothing to write home about", 3], ["I should have chosen another booking agency", 2]];
const createProduct = () => {
  let product = {};
  let secondItem= second[Math.floor(Math.random() * Math.floor(second.length))];
  let secondPhrase = secondItem[0];
  let customerItem =customer[Math.floor(Math.random() * Math.floor(customer.length))];

  product.customerReview = customerItem[0];
  product.quotes = quotes[Math.floor(Math.random() * Math.floor(quotes.length))]
  product.customerScore = customerItem[1];
  product.score = secondItem[1];
  
  product.name = `${firstName[Math.floor(Math.random() * Math.floor(firstName.length))]} ${lastName[Math.floor(Math.random() * Math.floor(lastName.length))]}`;
  product.description = `${first[Math.floor(Math.random() * Math.floor(first.length))]} ${secondPhrase} ${third[Math.floor(Math.random() * Math.floor(third.length))]}`;
  product.likes = parseFloat(Math.ceil(Math.random() * Math.ceil(100)));
  product.time = Math.floor(Math.random() * (62208000 - 2)) +1;
  return product
};

const createProducts = () => {
  let random = Math.floor(Math.random() * (100 - 10 + 1) ) + 10;
  let productsArr = [];
  for(let i = 0; i < random; i++){
      var tempObj = createProduct();
    productsArr.push(tempObj);
  }
  return productsArr
}

const insertMockData = function() {

  for (let i = 0; i < 100; i++) {
    let document = {};
    document.trips = trips[Math.floor(Math.random() * Math.floor(trips.length))];
    document.id = i+1;
    document.review = createProducts();
    var char = new Reviews(document);
    char.save();
  }


};
insertMockData();


