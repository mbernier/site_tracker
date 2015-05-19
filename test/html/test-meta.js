/*
Test the meta functionality works as expected
 */

var html_parser = require('../../lib/html.js'),
    request = require('request'),
    $ = require('cheerio');

var redirect_html = " <!DOCTYPE html> \
<html> \
    <head> \
        <title>Redirecting...</title> \
        <link rel=\"canonical\" href=\"https://example.com\"/> \
        <meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"/> \
        <meta http-equiv=\"refresh\" content=\"0; url=https://example.com\"/> \
    </head> \
    <body> \
        <p><strong>Redirecting...</strong></p> \
        <p><a href='https://example.com'>Click here if you are not redirected.</a></p> \
        <script> \
            document.location.href = \"https://example.com\"; \
        </script> \
    </body> \
</html>";

var not_redirect_html = " <!DOCTYPE html> \
<html> \
<head> \
    <title>Not Redirecting!</title> \
</head> \
<body> \
    <p>some content goes here!</p> \
</body> \
</html>";

exports['meta_is_redirect'] = function(test) {
    $ = $.load(redirect_html);
    test.expect(1);
    test.equal(html_parser.meta($('meta')), false, "This should have been a redirect, didn't read the meta information properly");
    test.done();
}

exports['meta_not_redirect'] = function(test) {
    $ = $.load(not_redirect_html);
    test.expect(1);
    test.ok(html_parser.meta($('meta')), "Should have gotten meta information, didn't");
    test.done();
}