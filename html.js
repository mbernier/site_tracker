module.exports = {

    images: function (img_objs, callback) {
        var source_url = process.env['page_url'];
        var $ = require('cheerio');
        var imgs = [],
            output = '';;

        if (img_objs.length > 0) {
            output += "<h2>Images</h2>";

            img_objs.each(function (key, img) {
                imgs.push(img);

                var img_url = String($(img).attr('src'));

                if (img_url.indexOf(process.env['base_url']) != -1) {
                    if (img_url.indexOf("http") != -1) {
                        img_url = img_url.replace("http");
                    }
                    img_url = img_url;
                } else {
                    img_url = process.env['base_url'] + img_url;
                }

                store.images(source_url, img_url);
            });
        }
        if (callback) {
            callback(output);
        }
    },

    links: function (link_objs, callback) {
        var $ = require('cheerio');

        var on_html = '',
            off_html = '',
            github_urls = [],
            links = {'on': [], 'off': []},
            output = '';

        link_objs.each(function (key, link) {
            var href = String($(link).attr('href'));

            //fix relative links
            if (href.indexOf("#") == 0) {
                href = process.env['page_url'] + href;
            }

            if (href.indexOf("https:") == -1 && href.indexOf("http:") == -1) {
                href = "http:" + href;
            }

            if (href.indexOf("https://github.com/" + process.env['github_repo']) != -1) {
                /*
                 @todo use file path parser to look at only the file we are using here, putting the rest of hte URLs into off_site url list
                 */
                github_urls.push(href);
            } else {

                //get links that are either on the base URL or not
                if (href.indexOf(process.env['base_url']) != -1) {
                    links['on'].push(href);
                } else {
                    links['off'].push(href);
                }

            }
        });

        /*
            @todo write a system that will just accept the URLs from the scraper, this system should enter new URLs, verify old urls, and store the linking of the urls
         */

        //sort and uniquify the links
        links['on'] = links['on'].sort().filter(function(elem, pos) {
            return links['on'].indexOf(elem) == pos;
        });

        //sort and uniquify the links
        links['off'] = links['off'].sort().filter(function(elem, pos) {
            return links['off'].indexOf(elem) == pos;
        })

        var on_len = links['on'].length;
        var off_len = links['off'].length;

        var count = on_len > off_len ? on_len : off_len;

        for (i = 0; i < count; i++) {
            if (links['on'][i]) {
                on_html += '<li><a href="' + links['on'][i] + '">' + links['on'][i] + '</a></li>';
            }

            if (links['off'][i]) {
                off_html += '<li><a href="' + links['off'][i] + '">' + links['off'][i] + '</a></li>';
            }
        }
        if (github_urls.length > 0) {
            output += '<h2>Github URLs</h2><ul>';
            for (i = 0; i < github_urls.length; i++) {
                output += '<li><a href="' + github_urls[i] + '">' + github_urls[i] + '</a></li>';
            }
            output += '</ul>';
        }
        output += "<h2>Off Docs links:</h2><p>Unique URLs:"+links['off'].length+"</p><ul>" + off_html + "</ul>" +
            "<h2>On Docs links:</h2><p>Unique URLs:"+links['on'].length+"</p><ul>" + on_html + "</ul>";

        if (callback) {
            callback(output);
        }
    },
    /*
        If there is a callback, it will pass the true/false there, otherwise it returns
        If this is a redirect page, it returns false - otherwise, true
     */
    meta: function(meta_objs, callback) {
        var source_url = process.env['page_url'];

        //these are the items we want to look for and record
        var lookingFor = ['description', 'keywords'];

        for (i=0;i<meta_objs.length;i++) {
            var temp_el = $(meta_objs[i]);

            //Check whether this is a redirect or not
            if (temp_el.attr('http-equiv') == 'refresh') {

                //this is a redirect page - get the URL from the content string which is supposed to be there with refresh meta

                //check that the "=" is there, and grab the URL. Otherwise, log something
                if (temp_el.attr('content').indexOf("=") != -1) {
                    var redirect_url = temp_el.attr('content').split("=")[1];

                    //store the redirect
                    store.meta(source_url, 'redirect', redirect_url);
                } else {

                    //We're seemingly missing the redirect url, so record that.
                    store.error(source_url, "Redirect URL Not Found, when it should have been there.", {"data": "content",
                                                                                                        "value": temp_el.attr('content')});
                }

                if (callback) {
                    callback(false);
                } else {
                    return false; // we're done here
                }
            }

            if (lookingFor.indexOf(item)) {
                //store the meta information
                store.meta(source_url, temp_el.attr('name'), temp_el.attr('content'));

                //take this out of the list so we can record what we're missing
                lookingFor.splice(temp_el.attr('name'), 1);

            } else {
                //Log the missing meta information in the log
                store.error(source_url, 'Missing Meta', {"data": temp_el.attr('name'), "value": temp_el.attr('content')});
            }
        }

        //make sure we write that we're missing data - this is not for the first scan as much as it is for all subsequent scans
        for (i=0;i<lookingFor;i++) {
            store.meta(source_url, lookingFor[i], null);
        }

        if (callback) {
            callback(true);
        } else {
            return true;
        }
    }
}