(function () {

	chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
		switch (request.action) {
		case 'close-tab':
			chrome.tabs.remove(sender.tab.id, function () {
				sendResponse({message: 'success'});
			});
			break;
		case 'get-bindings':
			localStorage['bindings'] = sender.bindings;
			break;
		case 'set-bindings':
			sendResponse({bindings: localStorage['bindings']});
			break;
		}
	});

	chrome.runtime.onInstalled.addListener(function () {
		// @TODO: make this update properly based on version we're moving to
		chrome.storage.local.set({'bindings': {
			'C-v': 'scroll-up-command',
			'M-v': 'scroll-down-command',
			'M-<': 'beginning-of-buffer',
			'M->': 'end-of-buffer',
			'C-x k': 'kill-buffer',
		}});
	});
})();
