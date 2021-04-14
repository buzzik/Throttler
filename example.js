const fetch = require('node-fetch');
const Throttler = require('./index.js'); // init throttler

let ms = 500; // 500 ms between requests
let limit = 2; // 2 request can be processed at the same time
const queue = new Throttler(ms, limit); // make a new instanse of the throttler
for (var i = 0; i < 100; i++) {
  queue.add(() => {
    //make a network request
    fetch('https://api.github.com/search/users?q=buzzik')
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        // freeing the queue from ready requests
        queue.checkout();
      });
  });
}
