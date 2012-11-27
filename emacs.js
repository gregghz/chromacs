(function () {

	document.addEventListener('keyup', function (e) {
		console.log(e.keyCode, e);
		
		if (e.keyCode === 86 && e.ctrlKey) { // C-v
			window.scrollBy(0, window.innerHeight-20);
		} else if (e.keyCode === 86 && e.altKey) { // M-v
			window.scrollBy(0, -(window.innerHeight-20));
		} else if (e.keyCode === 190 && e.ctrlKey) {
			window.scrollBy(0, document.body.scrollHeight);
		} else if (e.keyCode == 188 && e.ctrlKey) {
			window.scrollBy(0, -(document.body.scrollHeight));
		}
	});

})();
