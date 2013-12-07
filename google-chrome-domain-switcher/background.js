function checkForDomainSet(tabId, changeInfo, tab) {
	var activeSet = DomainSwitcher.getCurrentSet( tab ),
		hostname;

	if( activeSet ) {
		if( activeSet.domains.length > 2 ) {
			chrome.pageAction.setPopup({
				tabId: tabId,
				popup: "popup.html"
			});
		} else {
			chrome.pageAction.onClicked.addListener(function( tab ) {
				hostname = DomainSwitcher.getHostname( tab );

				activeSet.domains.forEach(function(domain, i) {
					if( hostname !== domain ) {
						var parts = domain.split(':'),
							newUrl = DomainSwitcher.setUrl( parts[ 0 ], parts[ 1 ] );

						chrome.tabs.update(tabId, {url: newUrl});
						return false;
					}
				});
			});
		}

		chrome.pageAction.show( tabId );
	}
}

chrome.tabs.onUpdated.addListener( checkForDomainSet );