var _startedAt;
var _isRunning = false;
var _ticks = 0;

exports.Stopwatch = {
	create: function() {
		return self;
	}
};

var self = {
	start: function() {
		if(self.isRunning) return;
		_isRunning = true;
		self.reset();
		updateTicks();
	},
	stop: function() {
		if(!!!self.isRunning) return;
		_isRunning = false;
	},
	restart: function() {
		self.stop();
		self.start();
	},
	reset: function() {
		_startedAt = new Date();
		_ticks = 0;
	},
	get isRunning() {
		return _isRunning;
	},
	get elapsed() {
		var ms = self.elapsedMilliseconds;
		var seconds = ms/1000;
		var now = _startedAt + ms;
		return {
			milliseconds: ms,
			seconds: seconds,
			minutes: seconds/60,
			hours: seconds/3600,
			days: (seconds/3600)/24,
			weeks: ((seconds/3600)/24)/7
		};
	},
	get elapsedMilliseconds() {
		if(!_startedAt) return 0;
		return new Date().valueOf() - _startedAt.valueOf();
	},
	get elapsedTicks() {
		return _ticks;
	}
};

var updateTicks = function() {
	if(_ticks === Number.MAX_VALUE) _ticks = 0;
	_ticks++;
	if(_isRunning) process.nextTick(updateTicks);
};