var request = require('request'),
    $ = require('cheerio'),
    html_parser = require('../lib/html.js'),
    store = require('../lib/store.js'),
    links = require('../lib/links.js');

module.exports = {

    page: function (url, callback) {

        var output = '';

        request(url, function(error, response, html) {

            if (error) {

                console.error(error);

                throw (error);

            } else {

                $ = $.load(html);

                /*
                 @todo is this an abandoned page?
                 Look at the flag for "status": live, dark-deploy, abandoned, tentative-abandoned
                 If this page has "dark-deploy" get the menu from the page and parse it
                 If this page has "abandoned" get the menu from the page and parse it
                 If this page has no status flag or is "live":
                 If menu list hash is not set:
                 then get the links in the menu, sort and hash
                 This should reference a menu object hash and compare to the menu going forward.
                 If the menu hash is different
                 it should re-parse the menu list for the differences (aka dark deploy or abandoned pages) and
                 set the tentative-abandoned flag
                 Otherwise,
                 set the status page as "live"

                 */

                //get the meta values from the page
                var meta = $('meta');

                /*
                 If this returns false, we're done because this is a redirect page
                 It will also handle grabbing the other meta information from the page if this is not a redirect
                 */
                if (html_parser.meta(meta)) {

                    //get the images from the html
                    this.images($('img'), url);

                    //get the links from the html
                    this.links($('a'), url);

                } else {
                    store.message(url, "Found a redirect");
                }
            }

            callback(output);
        });
    },

    /*
        Gets the links we need, how we need them. Passes them to be stored
     */
    links: function (link_objs, url) {

        var links_arr = [],
            github_urls = [];

        if (link_objs && link_objs.length > 0) {

            //get the hrefs from the html objects and clean # links
            for (i = 0; i < link_objs.length; i++) {

                var link = String($(link_obj).attr('href'));

                //pull out the github links into their own array to avoid processing the array again
                if (links.matches(link, "github.com" + process.env['github_repo'])) {

                    github_urls.push(link);

                } else {

                    links_arr.push(links.clean_hash_link(link, base_url));

                }

            }

            // sort the list
            links_arr = links_arr.sort();

            //which links are on or off the site?
            links_arr = links.on_off(links_arr, process.env['base_url']);

            //store internal links
            store.links_internal(url, links_arr["on"]);

            //store external links
            store.links_external(url, links_arr["off"]);
        }
    },

    meta: function (meta_objs) {

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
                    store.meta(url, 'redirect', redirect_url);
                } else {

                    //We're seemingly missing the redirect url, so record that.
                    store.error(url, "Redirect URL Not Found, when it should have been there.", {"data": "content",
                        "value": temp_el.attr('content')});
                }
            }

            if (lookingFor.indexOf(temp_el.attr('name'))) {
                //store the meta information
                store.meta(url, temp_el.attr('name'), temp_el.attr('content'));

                //take this out of the list so we can record what we're missing
                lookingFor.splice(temp_el.attr('name'), 1);

            } else {
                //Log the missing meta information in the log
                store.error(url, 'Missing Meta', {"data": temp_el.attr('name'), "value": temp_el.attr('content')});
            }
        }

        //make sure we write that we're missing data - this is not for the first scan as much as it is for all subsequent scans
        for (i = 0; i < lookingFor; i++) {
            store.meta(url, lookingFor[i], null);
        }
    }

    /*
        Gets the images and passes them to be stored
     */
    images: function (image_objs, url) {

        var source_url = process.env['page_url'];

        var imgs = [];

        if (img_objs.length > 0) {

            img_objs.each(function (key, img) {

                var img_url = String($(img).attr('src'));

                if (img_url.indexOf(process.env['base_url']) != -1) {

                    if (img_url.indexOf("http") != -1) {

                        img_url = img_url.replace("http");

                    }

                } else {

                    img_url = process.env['base_url'] + img_url;

                }
                imgs.push(img_url);
            });

            store.images(url, imgs);

        } else {

            store.message(url, "No images on this page");

        }
    }

}