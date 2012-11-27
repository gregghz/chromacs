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
		}
	}).activate();

})();
