# Throttler

Node.js module for making throttled queue of functions/requests.
This can be useful when you are working with an external API, where the number of requests per second is important.

## Installing

```
npm i throttler
```

## Usage

Fisrt things first.
Init Throttler

```
const Throttler = require('throttler');
```

Create new instance of Throttler and provide 2 parameters.

- _ms_ - is the deley between each execution
- _limit_ - is how many executions can be active in the same time. Another words - parallel execution limit.

```
const queue = new Throttler(ms, limit);
```

And wrap you target request with Throttler

```
queue.add(() => {
 // your code here
}
```

It is important to clear your queue as requests complete.

```
queue.checkout();
```

this method will clear queue for 1 position.

## Examples

```
const fetch = require('node-fetch');
const Throttler = require('requests-throttler'); // init throttler

let ms = 500; // 500 ms between requests
let limit = 2; // 2 request can be proceeded at the same time
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

```

The requests will starting to execute right after first request will be added.
