/*
Store all the things in the database!
 */

module.exports = {

    //this is just a wrapper for the log method
    error: function(source_url, note, data = null) {
        this.log(source_url, 'error', note, data);
    },

    images: function(source_url, img_url) {
        //store the images
    },

    links: function(source_url, link_url) {
        //store the links
    },

    /*
    data should be {key: , value:}
     */
    log: function(source_url, type, note, data = null) {
        //store this information in the log

    },

    //this is just a wrapper for the log method
    message: function(source_url, note, data = null) {
        this.log(source_url, 'message', note, data);
    },

    //store the meta information for this url, give different ones to different methods as needed
    meta: function(source_url, meta_name, meta_content) {

        //all the meta information is stored as key-value on the URL document
        this.message(source_url, "Stored Meta", {"key":meta_name, "value": meta_content});

    }

}