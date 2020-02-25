const fs = require('fs');
var faker = require('faker');

const quotez = ["AMAZING!!!!!!", "We had a blast", "The tour guides made this trip", "Travel Fever", "I wish I could have gone but HR took up my life", "Save me", "I was distracted by the latest thing Trump did"]
const tripz = ['Egypt', 'Kenya', 'Morocco', 'South Africa','China', 'Israel', 'India', 'Japan', 'South Korea', 'Thailand', 'Vietnam','France', 'Germany', 'Greece', 'Ireland', 'Italy', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Russia', 'Spain', 'Switzerland', 'United Kingdom','United States', 'Costa Rica', 'Mexico', 'Canada','Brazil', 'Peru', 'Australia', 'New Zealand', 'Colombia'];
const firstName = ['Kayrub', 'Sam', 'Christian', "Steven", "Shawn", "Eric", "Allen", "Matt", "Sarah", "Monique", "Evelyn", "Lindsey", "Gerard", "Ray", "Mikey", "Frank", "Shana", "Shala", "Sherry", "Sue", "Rose", "David"];
const lastName = ['Smith', 'Adams', 'Lee', 'Windsor', 'Markyle', 'Tuttle', 'McCormick', "Boswell", "Magnier", "Doyle", "Kennedy", "Hill", "Jones", "Wilson", 'Stark', "King", "Lopez", "Cook", "Henderson", "Bailey"];
const first = ['I', 'We', 'My parents', "My kids", "My grandparents", "My wife", "My Husband", "I", "I"];
const second = [['hated', 1], ['loved', 5], ['enjoyed', 4], ["disliked", 2], ["felt iffy about", 3]]
const third = ["this venue", "this house", "the accomodations", "the trip"]
const customer = [["They really took care of us", 4], ["Trafalger gave us a smooth experience", 4], ["We loved the customer service on our adventure!", 5], ["The booking experience was great", 5], ["Trafalger lost our booking!!!", 1], ["A representative at Trafalger made me cry on the phone", 1], ["Trafalger had some hidden fees", 2], ["the service was ok", 3], ["Nothing to write home about", 3], ["I should have chosen another booking agency", 2]];


const writeUsers = fs.createWriteStream('kayreview3.csv');
writeUsers.write('name, score, description, likes, time, customerScore, customerReview, quotes, tour_id\n', 'utf8');


function writeTenMillionUsers2(writer, encoding, callback) {
  console.log('Ready, Set: ', Date.now());
  let i = 3333334;
  let tracker = 6666666;
  let r = 0;
    function write() {
      let ok = true;
      do {
        i -= 1;
        tracker += 1
        r = Math.floor(Math.random() * 3) + 3;
        for (var y = 0; y < r; y++) {
          let secondItem= second[Math.floor(Math.random() * Math.floor(second.length))]
          let customerItem =customer[Math.floor(Math.random() * Math.floor(customer.length))];
          let secondPhrase = secondItem[0];
          const name = `${firstName[Math.floor(Math.random() * Math.floor(firstName.length))]} ${lastName[Math.floor(Math.random() * Math.floor(lastName.length))]}`;
          const score = secondItem[1];
          const description = `${first[Math.floor(Math.random() * Math.floor(first.length))]} ${secondPhrase} ${third[Math.floor(Math.random() * Math.floor(third.length))]}`;
          const likes = parseFloat(Math.ceil(Math.random() * Math.ceil(100)));
          const time = Math.floor(Math.random() * (62208000 - 2)) +1;
          const customerScore = customerItem[1];
          const customerReview = customerItem[0];
          const quotes = quotez[Math.floor(Math.random() * Math.floor(quotez.length))];
          const tour_id = tracker;
          const data = `${name}, ${score}, ${description}, ${likes}, ${time}, ${customerScore}, ${customerReview}, ${quotes}, ${tour_id}\n`;
        if (i === 0) {
          writer.write(data, encoding, callback);
        } else {
          ok = writer.write(data, encoding);
        }
      }  
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write()
}

writeTenMillionUsers2(writeUsers, 'utf-8', () => {
  writeUsers.end();
  console.log('10Million Complete: ', Date.now());
});