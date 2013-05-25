var Storage = {
	store: function (sets) {
	  localStorage.domain_sets = JSON.stringify(sets);
	},

	load: function () {
		var sets = localStorage.domain_sets;
		if( ! sets ) { return; }
		sets = JSON.parse(sets);
		for( var i in sets ) {
			sets[i] = new DomainSet(sets[i].name, sets[i].domains);
		}
		return sets;
	}
};
