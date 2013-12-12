test( "DomainSet Constructor", function() {
	var empty = new DomainSet(),
      name_only = new DomainSet('Test'),
      full = new DomainSet('Test', ['bing.com', 'google.com/test/path']);

	equal(empty.name, '');
	deepEqual(empty.domains, []);

	equal(name_only.name, 'Test');
	deepEqual(name_only.domains, []);

	equal(full.name, 'Test');
	deepEqual(full.domains, [{'host': 'bing.com', 'path': '/'}, {'host': 'google.com', 'path': '/test/path/'}]);
});

test( "DomainSet Normalization", function () {
	var full  = new DomainSet('Test', ['BING.COM', '   google.com   ', '    YAHOO.COM   ', '\r\nduckduckgo.com\r\n']);

	equal(full._normalizeHost('GOOGLE.COM'), 'google.com');
	equal(full._normalizeHost('        google.com            '), 'google.com');
	equal(full._normalizeHost('\r\ngoogle.com\r\n'), 'google.com');

	deepEqual(full.domains.map(function (e) { return e.host; }), ['bing.com', 'google.com', 'yahoo.com', 'duckduckgo.com']);
});

test( 'DomainSet Struct Creation', function () {
	var ds = new DomainSet();

	deepEqual(ds._domainToStruct("google.com"), {"host": "google.com", "path": "/"});
	deepEqual(ds._domainToStruct("google.com/"), {"host": "google.com", "path": "/"});
	deepEqual(ds._domainToStruct("google.com/test-path"), {"host": "google.com", "path": "/test-path/"});
	deepEqual(ds._domainToStruct("google.com/test-path/"), {"host": "google.com", "path": "/test-path/"});
});

test( 'DomainSet Set Behavior', function () {
	var empty = new DomainSet(),
	    full  = new DomainSet('Test', ['google.com', 'google.com/custom-path', 'bing.com/with-path', 'GOOGLE.COM', '    BING.com   ']);

	empty.add('google.com');
	deepEqual(empty.domains, [{'host': 'google.com', 'path': '/'}]);
	empty.add('google.com/custom-path');
	deepEqual(empty.domains, [{'host': 'google.com', 'path': '/'}]);
	empty.add('bing.com/with-path');
	deepEqual(empty.domains, [{'host': 'google.com', 'path': '/'}, {'host': 'bing.com', 'path': '/with-path/'}]);
	empty.add('GOOGLE.COM');
	deepEqual(empty.domains, [{'host': 'google.com', 'path': '/'}, {'host': 'bing.com', 'path': '/with-path/'}]);
	empty.add('    ');
	deepEqual(empty.domains, [{'host': 'google.com', 'path': '/'}, {'host': 'bing.com', 'path': '/with-path/'}]);

	deepEqual(full.domains, [{'host': 'google.com', 'path': '/'}, {'host': 'bing.com', 'path': '/with-path/'}]);
});

test( 'DomainSet Contains', function () {
	var empty = new DomainSet(),
	    full  = new DomainSet('Test', ['google.com/with-path', 'bing.com']);

	ok(!empty.contains('google.com'));
	empty.add('google.com');
	ok(empty.contains('google.com'));
	ok(!empty.contains('bing.com'));

	ok(!full.contains('yahoo.com'));
	ok(full.contains('google.com'));
	ok(full.contains('bing.com'));
});
