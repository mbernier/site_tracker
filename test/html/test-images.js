/*
 Test the image functionality works as expected
 */

var html_parser = require('../../lib/html'),
    request = require('request'),
    $ = require('cheerio');

var no_images_html = " <!DOCTYPE html> \
<html> \
<head> \
    <title>This page has no images</title> \
</head> \
<body> \
    <p>some content goes here!</p> \
</body> \
</html>";

var has_images_html = " <!DOCTYPE html> \
<html> \
<head> \
    <title>This page has images!</title> \
</head> \
<body> \
    <p>some content goes here!</p> \
    <img src='http://example.com/images/someimage.png' /> \
    <img src='http://example.com/images/someimage2.png' /> \
    <img src='http://example.com/images/someimage3.png' /> \
</body> \
</html>";

//test no images
exports['No Images in HTML'] = function(test) {
    $ = $.load(no_images_html);
    test.expect(1);
    test.equal(html_parser.images($('img')), false, "There are no images in this HTML");
    test.done();
}

//test images
exports['Images in HTML'] = function(test) {
    $ = $.load(has_images_html);
    test.expect(1);
    test.ok(html_parser.images($('img')), "There are images in this HTML and they were not found");
    test.done();
}