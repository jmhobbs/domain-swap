test( "DomainSet Constructor", function() {
	var empty = new DomainSet(),
      name_only = new DomainSet('Test'),
      full = new DomainSet('Test', ['bing.com', 'google.com']);

	equal(empty.name, '');
	deepEqual(empty.domains, []);
	equal(name_only.name, 'Test');
	deepEqual(name_only.domains, []);
	equal(full.name, 'Test');
	deepEqual(full.domains, ['bing.com', 'google.com']);
});

test( "DomainSet Normalization", function () {
	var full  = new DomainSet('Test', ['BING.COM', '   google.com   ', '    YAHOO.COM   ', '\r\nduckduckgo.com\r\n']);

	equal(full._normalizeDomain('GOOGLE.COM'), 'google.com');
	equal(full._normalizeDomain('        google.com            '), 'google.com');
	equal(full._normalizeDomain('\r\ngoogle.com\r\n'), 'google.com');

	deepEqual(full.domains, ['bing.com', 'google.com', 'yahoo.com', 'duckduckgo.com']);
});

test( 'DomainSet Set Behavior', function () {
	var empty = new DomainSet(),
	    full  = new DomainSet('Test', ['google.com', 'bing.com', 'GOOGLE.COM', '    BING.com   ']);

	empty.add('google.com');
	deepEqual(empty.domains, ['google.com']);
	empty.add('google.com');
	deepEqual(empty.domains, ['google.com']);
	empty.add('bing.com');
	deepEqual(empty.domains, ['google.com', 'bing.com']);
	empty.add('GOOGLE.COM');
	deepEqual(empty.domains, ['google.com', 'bing.com']);

	deepEqual(full.domains, ['google.com', 'bing.com']);
});

test( 'DomainSet Contains', function () {
	var empty = new DomainSet(),
	    full  = new DomainSet('Test', ['google.com', 'bing.com']);

	ok(!empty.contains('google.com'));
	empty.add('google.com');
	ok(empty.contains('google.com'));
	ok(!empty.contains('bing.com'));

	ok(!full.contains('yahoo.com'));
	ok(full.contains('google.com'));
	ok(full.contains('bing.com'));
});
