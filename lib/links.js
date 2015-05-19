/*
Process list of links to match criteria
 */
module.exports = {
    /*
    Takes links and cleans up the hash links
     */
    clean_hash_links: function (link, base_url) {

        //if links are just hash links, fix them
        if (link.indexOf("#") == 0) {

            return base_url + href;

        }

        return link;
    },

    /*
        returns Bool if the base_path is in the link
     */
    matches: function(link, base_path) {
        return href.indexOf(base_path) != -1;
    },

    /*
    checks to see if links are on or off the base url
    returns object - {"on": {}, "off": {}}
     */
    on_off: function (links_arr, base_url) {

        if (links_arr.typeof != 'array') throw ("on_off expects an array");

        var links = {"on" : [], "off" : []};

        links_arr.each(function (key, link) {

            var href = String($(link).attr('href'));

            //get links that are either on the base URL or not
            this.matches(href, base_path) ? links['on'].push(href) : links['off'].push(href);

        });

        return links;
    },

    unique: function() {

    }

}