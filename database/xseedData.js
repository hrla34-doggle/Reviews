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


const writeUsers = fs.createWriteStream('postrub.csv');
writeUsers.write('trips\n', 'utf8');

function writeTenMillionUsers(writer, encoding, callback) {
  console.log('Ready, Set: ', Date.now());
  let i = 10000000;
  let tracker = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      tracker += 1;
      const trips = tripz[Math.floor(Math.random() * tripz.length)];
      const data = `${trips}\n`
      // ${review[0].join('|')}_${review[1].join('|')
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

writeTenMillionUsers(writeUsers, 'utf-8', () => {
  writeUsers.end();
  console.log('10Million Complete: ', Date.now());
});
