const Reviews = require('./');
var mongoose = require('mongoose');
//lets me write files to csv
const fs = require('fs');
//lets me convert objects to csv, but promise issues
const ObjectsToCsv = require('objects-to-csv');
//test fake data
var faker = require('faker');

const quotes = ["AMAZING!!!!!!", "We had a blast", "The tour guides made this trip", "Travel Fever", "I wish I could have gone, but HR took up my life", "Save me", "I was distracted by the latest thing Trump did"]
const tripz = ['Egypt', 'Kenya', 'Morocco', 'South Africa','China', 'Israel', 'India', 'Japan', 'South Korea', 'Thailand', 'Vietnam','France', 'Germany', 'Greece', 'Ireland', 'Italy', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Russia', 'Spain', 'Switzerland', 'United Kingdom','United States', 'Costa Rica', 'Mexico', 'Canada','Brazil', 'Peru', 'Australia', 'New Zealand', 'Colombia'];
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

//product.time = gives you how long ago it was created.
//if i want to choose product id need to use proxy server.
//reverse proxy ahould work

const createProducts = () => {
  let random = Math.floor(Math.random() * (100 - 10 + 1) ) + 10;
  let productsArr = [];
  //for(let i = 0; i < random; i++)
  for(let i = 0; i < 2; i++){
      var tempObj = createProduct();
    productsArr.push(tempObj);
  }
  return productsArr
}

//create 10m first
  //save it somewhere.
  //create JSON or etc
//import after
  //choose how to insert
//ignore christians advice

const seed = async function() {
  for (let i = 0; i < 1000; i++) {
    Reviews.create()
      let document = new Reviews({
        trips: tripz[Math.floor(Math.random() * Math.floor(tripz.length))],
        id: counter,
        review: createProducts()
      });
      bucket.push(document);
      counter++;
    }
    await Reviews.insertMany(bucket)
    .then(() => console.log("How far can we Go!:", counter))
    .catch((err) => console.log(err))
  }
}
insertManyData();

const insertManyData = async function() {
  counter = 1
  for (let i = 0; i < 100000; i++) {
    let bucket = [];
    for (let x = 0; x < 100; x++) {
      let document = new Reviews({
        trips: tripz[Math.floor(Math.random() * Math.floor(tripz.length))],
        id: counter,
        review: createProducts()
      });
      bucket.push(document);
      counter++;
    }
    await Reviews.insertMany(bucket)
    .then(() => console.log("How far can we Go!:", counter))
    .catch((err) => console.log(err))
  }
}
insertManyData();



// const insertMockData = function() {

//   for (let i = 0; i < 100; i++) {
//     let document = {};
//     document.trips = trips[Math.floor(Math.random() * Math.floor(trips.length))];
//     document.id = i+1;
//     document.review = createProducts();
//     var char = new Reviews(document);
//     char.save();
//   }
// };
// insertMockData();

// var testingProduct = [{
//   randomName: "chistian ",
//   randomEmail: "idsj ya",
//   randomCard: "faker.helpers.createCard()"
// },
// {
//   randomName: "whaddup",
//   randomEmail: "dsfkl ",
//   randomCard: "looooo"
// }]

// let csvContent = "data:text/csv;charset=utf-8,";
// testingProduct.forEach(function(rowArray) {
//   let row = rowArray.join(",");
//   csvContent += row + "\r\n";
// });

// var encodedUri = encodeURI(csvContent);
// window.open(encodedUri);


// const writeUsers = fs.createWriteStream('kayrub.csv');
// writeUsers.write('trips, id\n', 'utf8');

// function writeTenMillionUsers(writer, encoding, callback) {
//   let i = 100;
//   let tracker = 0;
//   function write() {
//     let ok = true;
//     do {
//       i -= 1;
//       tracker += 1;
//       const trips = tripz[Math.floor(Math.random() * Math.floor(tripz.length))];
//       const id = i+1;
//       const data = `${trips},${id},\n`
//       if (i === 0) {
//         writer.write(data, encoding, callback);
//       } else {
// // see if we should continue, or wait
// // don't pass the callback, because we're not done yet.
//         ok = writer.write(data, encoding);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
// // had to stop early!
// // write some more once it drains
//       writer.once('drain', write);
//     }
//   }
// write()
// }

// writeTenMillionUsers(writeUsers, 'utf-8', () => {
//   writeUsers.end();
// });