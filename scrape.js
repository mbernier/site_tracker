modules.export = {

    page: function (url, callback) {

        var output = '';

        request(url, function(error, response, html) {

            if (error) {
                console.error(error);
                output += "There was an error <pre>" + error + "</pre>";
            } else {

                output += "<h2>Page</h2><a href=\""+process.env['page_url']+'">'+process.env['page_url']+'</a>';

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

                 @todo abandoned page report:
                 The docs tracker user should be able to see a list of new pages where they can mark them as "dark deployed"
                 or abandoned instead of tentative-abandoned.
                 */

                //get the meta values from the page
                var meta = $('meta');

                /*
                 If this returns false, we're done because this is a redirect page
                 It will also handle grabbing the other meta information from the page if this is not a redirect
                 */
                if (meta.length==0 || html_parser.meta(meta)) {

                    //Get the images from the page
                    var img_objs = $('img');
                    output += html_parser.images(img_objs,function(output) {
                        return output;
                    });

                    //Get the link information
                    var link_objs = $('a');
                    output += html_parser.links(link_objs, function(output){
                        return output;
                    });
                }
            }

            callback(output);
        });
    }

}