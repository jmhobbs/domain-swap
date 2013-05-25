var sets = Storage.load();

if( sets.length === 0 ) {
	$('#message').text('No Domain Sets Defined');
}
else {
	chrome.tabs.getSelected(null, function (tab){
		var found_set
		,   hostname
		,   link = document.createElement("a");

		link.href = tab.url;

		hostname = link.hostname + (("" === link.port) ? "" : ":" + link.port);

		$.each(sets, function (set_i, set) {
			$.each(set.domains, function (domain_i, domain) {
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
			$('#message').text(found_set.name);
			$.each(found_set.domains, function (i, domain) {
				if( hostname !== domain ) {
					$('#options').append($('<li/>').append($('<a/>').attr('href', '#').text(domain).data('domain', domain)));
				}
			});
			$('a').on('click', function () {
				var parts = $(this).data('domain').split(':');
				link.hostname = parts[0];
				link.port = parts[1] || '80';
				chrome.tabs.update(tab.id, {url: link.href});
				window.close();
			});
		}
		else {
			$('#message').text('No set for: ' + hostname);
		}
	});
}
