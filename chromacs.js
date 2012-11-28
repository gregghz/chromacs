var chromacs = (function () {
	var keyboard = new Keyboard();
	var preproc_binding = function (raw) {
		return raw.replace('C', 'ctrl').
			replace('M', 'alt').
			replace(/-/g, '+').
			replace('>', 'shift+.').
			replace('<', 'shift+,');
	};
	var postproc_binding = function (processed) {
		return processed.replace('shift+,', '<').
			replace('shitf+.', '>').
			replace(/+/g, '-').
			replace('alt', 'M').
			replace('ctrl', 'C');
	};

	var buildCallback = function (callback) {
		return function (e) {
			e.stop();
			callback();
		}
	};

	var load_events = function (bindings) {
		var events = {};
		Object.each(bindings, function (value, key) {
			var shortcut = preproc_binding(key);
			raw_events[key] = value;
			events[shortcut] = buildCallback(callbacks[value]);
		});

		keyboard.addEvents(events);
	}

	var raw_events = {};
	
	var chromacs = {
		activate: function () {
			chrome.storage.local.get('bindings', function (obj) {
				load_events(obj['bindings']);
				keyboard.activate();
			});
		},
		add_binding: function (key, value) {
			chrome.storage.local.get('bindings', function (obj) {
				var bindings = obj['bindings'];
				bindings[key] = value;
				load_events(bindings);
				chrome.storage.local.set({'bindings': raw_events});
			});
		},
	};

	var callbacks = {
		'scroll-up-command': function () {
			window.scrollBy(0, window.innerHeight-20);
		},
		'scroll-down-command': function () {
			window.scrollBy(0, -(window.innerHeight-20));
		},
		'beginning-of-buffer': function () {
			window.scrollBy(0, -(document.body.scrollHeight));
		},
		'end-of-buffer': function () {
			window.scrollBy(0, document.body.scrollHeight);
		},
		'kill-buffer': function () {
			chrome.extension.sendMessage({action: 'close-tab'}, function (r) {

			});
		},
		'keyboard-quit': function () {
			console.log('quit');
		},
		'test-thing': function () {
			console.log('test-thing');
		}
	}

	return chromacs;
})();
