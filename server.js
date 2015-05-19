
var html_parser = require('./html.js'),
    store = require('./store.js');

var express = require('express'),
	fs = require('fs'),
	request = require('request'),
	cheerio = require('cheerio');

var app = express();

//What is the base URL for the site? Used to determine on/off site links
process.env['base_url'] = "https://sendgrid.com/docs/";

//what is the GITHUB URL for your site? Used to find github links for this repo/file
process.env['github_repo'] = "https://github.com/sendgrid/docs";

//the URL of the page we're scraping
process.env['page_url'] = 'https://sendgrid.com/docs/Apps/index.html';

var output = '';

var serve = true;

var $ = cheerio;

app.get('/page/:id', function(req, res){
    /*
     This should look up the info about the page:id and display it
     */
});

app.get('/images', function(req, res){
    /*
     Show all the images in the docs
     */
});

app.get('/tasks', function(req, res) {
    /*
     List all the tasks in order of score
     */
});

app.get('/task/:id', function(req, res) {
    /*
     View a single task, related tasks (by page URL)
     */
});

app.post('/task', function(req, res) {
    /*
     accept a new task, calculate the score
     */
});


app.get('/scrape', function(req, res) {
    request(process.env['page_url'], function(error, response, html) {

        if (error) {
            console.error(error);
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
                output += html_parser.images(img_objs);

                //Get the link information
                var link_objs = $('a');
                output += html_parser.links(link_objs);
            }
        }

        res.send(output);
    });
});

app.post('/urls', function(req, res) {
   /*
    @todo this should get the ID of the page_url being scraped and all the new URLs:
        - it should:
            check whether each URL exists in the database
            store if not, with association to the page
     */
});

app.listen('4000')
console.log('Server running on http://localhost:4000');
exports = module.exports = app;
