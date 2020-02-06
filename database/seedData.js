const Reviews = require('./');
var mongoose = require('mongoose');



const firstName = ['Jonathan', 'Sam', 'Brian', "Steven", "Shawn", "Eric", "Allen", "Matt", "Sarah", "Monique", "Evelyn", "Lindsey", "Gerard", "Ray", "Mikey", "Frank", "Shana", "Shala", "Sherry", "Sue", "Rose", "David"];
const lastName = ['Smith', 'Adams', 'Parker', 'Windsor', 'Markyle', 'Tuttle', 'McCormick', "Boswell", "Magnier", "Doyle", "Kennedy", "Hill", "Jones", "Wilson", 'Stark', "King", "Lopez", "Cook", "Henderson", "Bailey"];
const first = ['I', 'We', 'My parents', "My kids", "My grandparents", "My wife", "My Husband", "I", "I"];
const second = [['hated', 1], ['loved', 5], ['enjoyed', 4], ["disliked", 2], ["felt iffy about", 3]]
const third = ["this venue", "this house", "the accomodations", "the trip"]
const createProduct = () => {
  let product = {};
  let secondItem= second[Math.floor(Math.random() * Math.floor(second.length))];
  let secondPhrase = secondItem[0];
  product.score = secondItem[1];
  product.name = `${firstName[Math.floor(Math.random() * Math.floor(firstName.length))]} ${lastName[Math.floor(Math.random() * Math.floor(lastName.length))]}`;
  product.description = `${first[Math.floor(Math.random() * Math.floor(first.length))]} ${secondPhrase} ${third[Math.floor(Math.random() * Math.floor(third.length))]}`;
  product.likes = parseFloat(Math.ceil(Math.random() * Math.ceil(100)));
  product.time = Math.floor(Math.random() * (62208000 - 2)) +1;
  return product
};

const createProducts = () => {
  let productsArr = [];
  for(let i = 0; i < 200; i++){
      var tempObj = createProduct();
      tempObj.id = i+1;
    productsArr.push(tempObj);
  }
  return productsArr
}

const insertMockData = function() {
Reviews.create(createProducts());

};
insertMockData();

