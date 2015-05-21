
var scrape = require('./lib/scrape.js');

var bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
	fs = require('fs');

var app = express();

mongoose.connect('mongodb://localhost/site_tracker_development', function (err) {
    if (!err) {
        console.log('connected to MongoDB');
    } else {
        throw err;
    }
});

/*
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Page = new Schema({
    url: String,
    title: String,
    update: Date,
    on_site_links: Array,
    off_site_links: Array,
    github_links: Array,
    images: Array,
    description: String,
    keywords: String,
    is_redirect: Bool,
});

var Task = new Schema({
    name: String,
    description: String,
    url: String,
    completion_status: Number
});

var Task = mongoose.model('Task', Task);
*/



//What is the base URL for the site? Used to determine on/off site links
process.env['base_url'] = "https://sendgrid.com/docs/";

//what is the GITHUB URL for your site? Used to find github links for this repo/file
process.env['github_repo'] = "https://github.com/sendgrid/docs";

//the URL of the page we're scraping
process.env['page_url'] = 'https://sendgrid.com/docs/Apps/index.html';

exports = module.exports = app;

app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(errorHandler());
}

app.get('/', routes.index);

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

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});






