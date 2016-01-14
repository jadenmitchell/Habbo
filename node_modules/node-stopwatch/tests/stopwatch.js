var sleep = require("sleep");
var Stopwatch = require("../lib/stopwatch").Stopwatch;

module.exports["should return elapsed time/ticks in zero when not started"] = function(test) {
	test.expect(3);

	var stopwatch = Stopwatch.create();
	test.equal(stopwatch.isRunning, false);
	test.equal(stopwatch.elapsedMilliseconds, 0);
	test.equal(stopwatch.elapsedTicks, 0);

	test.done();
};

module.exports["should return elapsed time/ticks not in zero when started"] = function(test) {
	test.expect(3);

	var stopwatch = Stopwatch.create();

	stopwatch.start();

	sleep.sleep(2);

	stopwatch.stop();

	test.equal(stopwatch.isRunning, false);
	test.ok(stopwatch.elapsedMilliseconds > 0);
	test.ok(stopwatch.elapsedTicks > 0);

	test.done();
};

module.exports["should return elapsed time/ticks not in zero when restarted"] = function(test) {
	test.expect(3);

	var stopwatch = Stopwatch.create();

	stopwatch.restart();

	sleep.sleep(2);

	stopwatch.stop();

	test.equal(stopwatch.isRunning, false);
	test.ok(stopwatch.elapsedMilliseconds > 0);
	test.ok(stopwatch.elapsedTicks > 0);

	test.done();
};

module.exports["should return elapsed time/ticks in zero after reset"] = function(test) {
	test.expect(3);

	var stopwatch = Stopwatch.create();

	stopwatch.start();

	sleep.sleep(2);

	stopwatch.stop();
	stopwatch.reset();

	test.equal(stopwatch.isRunning, false);
	test.equal(stopwatch.elapsedMilliseconds, 0);
	test.equal(stopwatch.elapsedTicks, 0);

	test.done();
};