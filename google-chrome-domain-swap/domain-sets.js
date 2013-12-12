/**
 * A set of domains, with a name.
 */
var DomainSet = function (name, domains) {
	this.name = name || "";
	this.domains = [];

	/**
	 * Return a normal form for a domain, allows us to easily search.
	 */
	this._normalizeDomain = function (domain) {
		return domain.toLowerCase().trim();
	};

	/**
	 * Add a domain to this set.
	 */
	this.add = function (domain) {
		domain = this._normalizeDomain(domain);
		if( ! this.contains(domain) && 0 < domain.length ) {
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
	this.contains = function (domain) {
		return -1 !== this.domains.indexOf(this._normalizeDomain(domain));
	};

	this.toJSON = function () {
		return {name: this.name, domains: this.domains};
	};

	// Add them individually to ensure they are normalized and unique.
	if( domains ) {
		for( var i in domains ) {
			this.add(domains[i]);
		}
	}

	return this;
};
