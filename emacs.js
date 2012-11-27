(function () {
	var main_keyboard = new Keyboard({
		events: {
			'ctrl+v': function () {
				window.scrollBy(0, window.innerHeight-20);
			},
			'alt+v': function () {
				window.scrollBy(0, -(window.innerHeight-20));
			},
			'alt+shift+.': function () {
				window.scrollBy(0, document.body.scrollHeight);
			},
			'alt+shift+,': function () {
				window.scrollBy(0, -(document.body.scrollHeight));
			},
			'ctrl+x': function () {
				ctrl_x_keyboard.activate();
			},
			'ctrl+n': function (e) {
				e.stop();
			},
			'ctrl+s': function (e) {
				e.stop();
			}
		}
	}).activate();

	var ctrl_x_keyboard = (function () {
		var relinquish = function (e) {
			if (e)
				e.stop();
			ctrl_x_keyboard.deactivate();
			main_keyboard.activate();
		};
	
		var ctrl_x_keyboard = new Keyboard({
			events: {
				'k': function () {
					chrome.extension.sendMessage({action: "close-tab"}, function (response) {
						relinquish();
					});
				},
				'ctrl+g': relinquish,
			}
		});

		return ctrl_x_keyboard;
	})();
})();
