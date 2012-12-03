(function () {
	//chrome.extension.getBackgroundPage().chromacs.activate();
	chrome.extension.sendMessage({action: 'activate'}, function () {});
})();
