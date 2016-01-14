# node-stopwatch

## Usage

``` js
var Stopwatch = require("node-stopwatch").Stopwatch;

var stopwatch = Stopwatch.create();
stopwatch.start();

/*
my long task here
*/

console.log("ticks: " + stopwatch.elapsedTicks);
console.log("milliseconds: " + stopwatch.elapsedMilliseconds);
console.log("seconds: " + stopwatch.elapsed.seconds);
console.log("minutes: " + stopwatch.elapsed.minutes);
console.log("hours: " + stopwatch.elapsed.hours);

//stop it now
stopwatch.stop();
```

## Methods
```
start();
stop();
reset();
restart();
```
## Installation

### Installing stopwacht

``` bash
  $ npm install node-stopwatch
```
