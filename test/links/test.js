
var links = require('../../lib/links.js'),
    $ = require('cheerio');

exports['links::clean_hash_link'] = function(test) {

    test.expect(3);

    //clean a link that is just a hash
    test.equal(links.clean_hash_link("#one", "http://example.com"),"http://example.com#one");

    //doesn't need to be cleaned
    test.equal(links.clean_hash_link("http://example.com", "http://example.com"),"http://example.com");

    //doesn't need to clean a link with base & hash
    test.equal(links.clean_hash_link("http://example.com#something-here", "http://example.com"),"http://example.com#something-here");

    test.done();
}

exports['Testing links::matches'] = function(test) {

    test.expect(2);

    //this matches
    test.ok(links.matches("http://example.com/something/foo/bar", "http://example.com"));

    //does not match
    test.equal(links.matches("http://example2.com/something/foo/bar", "http://example.com"), false);

    test.done();
}

exports['links::on_off'] = function(test) {
    test.expect(3);

    test.throws(function() { links.on_off("something") },
        "http://example.com",
        "on_off expects an array");

    var links_list = ["http://example.com/foo", "http://example.com/bar", "http://example2.com/foo"];
    var links_arr = links.on_off(links_list,
                                 "http://example.com");

    test.deepEqual(links_arr['on'], ["http://example.com/foo","http://example.com/bar"], "On site links didn't match");

    test.deepEqual(links_arr['off'], ["http://example2.com/foo"], "Off site links didn't match");

    test.done();
}
