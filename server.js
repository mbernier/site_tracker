
var scrape = require('./lib/scrape.js');

var express = require('express'),
	fs = require('fs');

var app = express();

//What is the base URL for the site? Used to determine on/off site links
process.env['base_url'] = "https://sendgrid.com/docs/";

//what is the GITHUB URL for your site? Used to find github links for this repo/file
process.env['github_repo'] = "https://github.com/sendgrid/docs";

//the URL of the page we're scraping
process.env['page_url'] = 'https://sendgrid.com/docs/Apps/index.html';

var output = '';

var serve = true;

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
    //calls the scraper for the URL in process.env['page_url']
    scrape.page(process.env['page_url'], function(output) {
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
