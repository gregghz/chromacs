var chromacs = (function () {
	var keyboard = new Keyboard();
	var preproc_binding = function (raw) {
		var proc = raw.replace('C', 'ctrl').
			replace('M', 'alt').
			replace(/-/g, '+').
			replace('>', 'shift+.').
			replace('<', 'shift+,');
		return proc;
	};

	var buildCallback = function (callback, check, append) {
		return function (e) {
			if ((!check && state == null) || (check && check(state))) {
				e.stop();
				callback();
			}

			if (append) {
				append(e);
			}
		}
	};

	var state = null;
	var load_events = function (bindings) {
		var events = {};
		Object.each(bindings, function (value, key) {
			var shortcut = preproc_binding(key);
			var split = shortcut.split(' ');

			if (split.length < 2) {
				raw_events[key] = value;
				events[shortcut] = buildCallback(callbacks[value]);
			} else {
				events[split[0]] = buildCallback(function () {
					state = split[0];
				});

				var cont = function (state) {
					console.log(state, split[0]);
					return state === split[0];
				};

				events[split[1]] = buildCallback(callbacks[value], cont, events[split[1]]);
			}
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
		update_events: function (events) {
			chrome.storage.local.set({'bindings': events}, function () {
				load_events(events);
			});
		}
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
			chrome.extension.sendMessage({action: 'close-tab'}, function (r) {});
		},
		'keyboard-quit': function () {
			console.log('quit');
		},
	}

	return chromacs;
})();
