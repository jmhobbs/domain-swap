/**
 * A set of domains, with a name.
 */
var DomainSet = function (name, domains) {
	var i;

	this.name = name || "";
	this.domains = [];

	/**
	 * Return a normal form for a domain, allows us to easily search.
	 */
	this._normalizeHost = function (domain) {
		return domain.toLowerCase().trim();
	};

	this._domainToStruct = function (domain) {
		var a = window.document.createElement('a');
		a.href = 'http://' + domain.trim();
		return {
			host: this._normalizeHost(a.host),
			path: a.pathname.replace(/\/+$/, '') + '/'  // Enforce trailing slash. Eww.
		};
	};

	/**
	 * Add a domain to this set.
	 */
	this.add = function (domain) {
		if( "string" === typeof(domain) ) {
			domain = this._domainToStruct(domain);
		}
		if( ! this.contains(domain.host) && 0 < domain.host.length ) {
			this.domains.push(domain);
		}
	};

	/**
	 * Remove all domains from this set.
	 */
	this.clear = function () {
		this.domains = [];
	};

	/**
	 * Test if the set contains a domain.
	 */
	this.contains = function (host) {
		var i,
				normal_host = this._normalizeHost(host);

		for( i in this.domains ) {
			if( this.domains.hasOwnProperty(i) ) {
				if ( this.domains[i].host === normal_host ) { return true; }
			}
		}

		return false;
	};

	this.toJSON = function () {
		return {name: this.name, domains: this.domains};
	};

	// Add them individually to ensure they are normalized and unique.
	if( domains ) {
		for(i in domains ) {
			if( domains.hasOwnProperty(i) ) {
				this.add(domains[i]);
			}
		}
	}

	return this;
};
