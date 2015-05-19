/*
 Test the links functionality works as expected
 */

var html_parser = require('../../lib/html'),
    request = require('request'),
    $ = require('cheerio');

var no_links_html = " <!DOCTYPE html> \
<html> \
<head> \
    <title>This page has no images</title> \
</head> \
<body> \
    <p>some content goes here!</p> \
</body> \
</html>";

var has_links_html = " <!DOCTYPE html> \
<html> \
<head> \
    <title>This page has images!</title> \
</head> \
<body> \
    <p>some content goes here!</p> \
    <a href='http://example.com/index.html' /> \
    <a href='http://example.com/another/index.html' /> \
    <a href='http://example.com/last/index.html' /> \
</body> \
</html>";

//test no links
exports['No Links in HTML'] = function(test) {
    $ = $.load(no_links_html);
    test.expect(1);
    test.equal(html_parser.links($('a')), false, "There are no links in this HTML");
    test.done();
}

//test links
exports['Links in HTML'] = function(test) {
    $ = $.load(has_links_html);
    test.expect(1);
    test.ok(html_parser.links($('a')), "There are links in this HTML and they were not found");
    test.done();
}

//test links on/off site

//test link string fixes

//test