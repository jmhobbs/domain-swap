var sets = Storage.load();

if( sets.length === 0 ) {
	document.querySelector('#message').textContent = 'No Domain Sets Defined';
}
else {
	chrome.tabs.getSelected(null, function (tab){
		var found_set
		,   hostname
		,   link = document.createElement("a");

		link.href = tab.url;

		hostname = link.hostname + (("" === link.port) ? "" : ":" + link.port);

		sets.forEach(function (set, set_i) {
			set.domains.forEach(function (domain, domain_i) {
				if( hostname === domain ) {
					found_set = set;
					return false;
				}
			});
			if( found_set ) {
				return false;
			}
		});

		if( found_set ) {
			// Short-circuit the popup when only two domains in the set
			if( found_set.domains.length === 2 ) {
				found_set.domains.forEach(function(domain, i) {
					if( hostname !== domain ) {
						var parts = domain.split(':');
						link.hostname = parts[0];
						link.port = parts[1] || '80';
						chrome.tabs.update(tab.id, {url: link.href});
						window.close();
						return false;
					}
				});
			}

			document.querySelector('#message').textContent = found_set.name;
			found_set.domains.forEach(function(domain, i) {
				if( hostname !== domain ) {
          var template = '<li><a href="#" data-domain="' + domain + '">' + domain + '</a></li>';
          document.querySelector('#options').innerHTML += template;
				}
			});
			var links = document.querySelectorAll('a');
      for (var i = 0; i < links.length; i++) {
          links[i].addEventListener('click', function (e) {
            var parts = this.dataset.domain.split(':');
            link.hostname = parts[0];
            link.port = parts[1] || '80';
            chrome.tabs.update(tab.id, {url: link.href});
            window.close();
          });
			}
		}
		else {
			document.querySelector('#message').textContent = 'No set for: ' + hostname;
		}
	});
}
