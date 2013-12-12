;(function() {
	var link = document.createElement( 'a' );

	/* implied global */
	DomainSwitcher = {
		getHostname: function( tab ) {
			link.href = tab.url;
			return link.hostname + (("" === link.port) ? "" : ":" + link.port);
		},
		setUrl: function( hostname, port, from_path, to_path ) {
			link.hostname = hostname;
			link.port = port || ( link.protocol === 'https:' ? '443' : '80' );

			link.pathname = link.pathname.replace(from_path, to_path);

			return link.href;
		},
		getCurrentSet: function( tab ) {
			var found_set,
				sets = Storage.load(),
				hostname = DomainSwitcher.getHostname( tab );

			sets.forEach(function (set, set_i) {
				set.domains.forEach(function (domain, domain_i) {
					if( hostname === domain.host ) {
						found_set = set;
						return false;
					}
				});

				if( found_set ) {
					return false;
				}
			});

			return found_set;
		}
	};
})();