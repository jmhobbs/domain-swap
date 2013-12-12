var sets = Storage.load();

if( sets.length === 0 ) {
	document.querySelector('#message').textContent = 'No Domain Sets Defined';
}
else {
	chrome.tabs.getSelected(null, function (tab){
		var hostname = DomainSwitcher.getHostname( tab ),
			found_set = DomainSwitcher.getCurrentSet( tab ),
			this_tab;

		if( found_set ) {
			document.querySelector('#message').textContent = found_set.name;

			found_set.domains.forEach(function(domain, i) {
				if( hostname === domain.host ) {
					this_tab = found_set.domains[i];
				}
				else {
					var template = '<li><a href="#" data-path="' + domain.path +'" data-domain="' + domain.host + '">' + domain.host + '</a></li>';
					document.querySelector('#options').innerHTML += template;
				}
			});

			var links = document.querySelectorAll('a');
			for (var i = 0; i < links.length; i++) {
				links[i].addEventListener('click', function (e) {
					var parts = this.dataset.domain.split(':'),
						newUrl = DomainSwitcher.setUrl( parts[ 0 ], parts[ 1 ], this_tab.path, this.dataset.path);

					chrome.tabs.update(tab.id, {url: newUrl});
					window.close();
				});
			}
		}
		else {
			document.querySelector('#message').textContent = 'No set for: ' + hostname;
		}
	});
}
