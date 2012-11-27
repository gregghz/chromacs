chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action == 'close-tab')
		chrome.tabs.remove(sender.tab.id, function () {
			sendResponse({message: 'success'});
		});
});
