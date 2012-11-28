(function () {
	$(window).addListener('load', function () {
		chromacs.activate();
		var $tbody = $$('table tbody')[0];

		chrome.storage.local.get('bindings', function (obj) {
			var keys = Object.keys(obj['bindings']);
			keys.sort();
			for (i = 0; i < keys.length; i++) {
				var key = keys[i];
				var value = obj['bindings'][key];
				
				$tr = new Element('tr');
				$tr.grab(new Element('td').grab(new Element('input').set('value', key)));
				$tr.grab(new Element('td').grab(new Element('input').set('value', value)));
				$tbody.grab($tr);
			}
		});

		//chromacs.add_binding('C-e', 'test-thing');
	});
})();
