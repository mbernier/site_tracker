/*
Process list of links to match criteria
No method here should require cheerio
 */
module.exports = {
    /*
    Takes links and cleans up the hash links
     */
    clean_hash_link: function (link, base_url) {

        //if links are just hash links, fix them
        if (link.indexOf("#") == 0) {

            return base_url + link;

        }

        return link;
    },

    /*
        returns Bool if the base_path is in the link
     */
    matches: function(link, base_path) {
        return link.indexOf(base_path) != -1;
    },

    /*
    checks to see if links are on or off the base url
    returns object - {"on": {}, "off": {}}
     */
    on_off: function (links_arr, base_url) {

        if (!Array.isArray(links_arr)) throw ("on_off expects an array");

        var links = {"on" : [], "off" : []};

        for (i=0; i< links_arr.length; i++) {
            var link = links_arr[i];

            //get links that are either on the base URL or not
            this.matches(link, base_url) ? links['on'].push(link) : links['off'].push(link);
        }

        return links;
    }

}