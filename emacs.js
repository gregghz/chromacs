(function () {

	var kbEvents = new Keyboard({
		events: {
			'ctrl+v': function () {
				window.scrollBy(0, window.innerHeight-20);
			},
			'alt+v': function () {
				window.scrollBy(0, -(window.innerHeight-20));
			},
			'ctrl+shift+.': function () {
				window.scrollBy(0, document.body.scrollHeight);
			},
			'ctrl+shift+,': function () {
				window.scrollBy(0, -(document.body.scrollHeight));
			}
		}
	}).activate();

})();
