(function () {
	$(window).addListener('load', function () {
		chromacs.activate();
		var $tbody = $$('table tbody')[0];

		var add_row = function ($target, key, value) {
			var $tr = new Element('tr');
			$tr.grab(new Element('td').grab(new Element('input').set('value', key)));
			$tr.grab(new Element('td').grab(new Element('input').set('value', value)));

			var remove = new Element('input[type=button]').set('value', '-');
			remove.addEvent('click', function () {
				$tr.dispose();
			});
			
			$tr.grab(new Element('td').grab(remove));
			$target.grab($tr);
		};

		chrome.storage.local.get('bindings', function (obj) {
			var keys = Object.keys(obj['bindings']);
			keys.sort();
			for (i = 0; i < keys.length; i++) {
				var key = keys[i];
				var value = obj['bindings'][key];
				
				add_row($tbody, key, value);
			}
		});

		$('save').addEvent('click', function () {
			var events = {};
			$tbody.getElements('tr').each(function (tr) {
				var $inputs = $(tr).getElements('td input');
				var key = $inputs[0].value;
				var value = $inputs[1].value;
				events[key] = value;
			});

			chromacs.update_events(events);
		});

		$('add').addEvent('click', function () {
			add_row($tbody, '', '');
		});
	});
})();
