# Site Tracker

A website scraper that intends to build a database of knowledge about your website. I am using this as a way to learn node, react, mongodb,
and other tools while solving a couple problems I need to solve for my job.
  
Uses cheerio as the core "scraper" for the page content.

## Install

* Clone the repo
* `npm install`
* `node server.js`
* browse to [localhost:4000](http://localhost:4000)

## What's done?

This is a bigger list than I originally intended. Can you say feature creep? 

### Scraper

- [ x ] Write code to get images
- [ x ] Write code to get links
- [ x ] Write code to get meta information 
- [ x ] Identify redirect HTML pages and where they redirect to
- [ x ] Send list of URLs to an endpoint to process them
- [ x ] Send list of images to an endpoint to process them
- [ ] Have the scraper process [run on a schedule](http://blog.nodejitsu.com/npmawesome-agenda/)

### Database

- [ ] Replace strings with IDs in store.js
- [ ] Create pages
  - [ ] account for github URLs
  - [ ] account for redirect pages
  - [ ] add page status: live, dark-deploy, abandoned, tentative-abandoned
- [ ] Create images
- [ ] Create tasks
- [ ] Figure out how to log the data, whether one big stream that is searchable or...?

### URLs

- [ x ] Receive the source URL and the list of the urls for this page
- [ ] Get the stored URLs for this page from the database
- [ ] Compare to what is in the database for this source URL
- [ ] Log which URLs were added/removed from this page

### Images
 
- [ x ] Receive the source url and list of images for this page
- [ ] Get the images for this source URL from the database
- [ ] Compare to what is in the database for this source URL, identify abandoned images?
    - [ ] Log which images are added and which are removed
- [ ] Store them
- [ ] Log which images were added/removed from this page
- [ ] handle if there are no images on the page

### Reports

- [ ] Scraping report
  - [ ] If you go to /scrape and there's no URLs in the database, ask for a URL
    - [ ] store the URL and queue it for scraping
  - [ ] If there are URLs, show the scraping queue
- [ ] Abandoned page report
- [ ] All page report (how to do this so that it doesn't suck)
- [ ] All tasks report
- [ ] Images Report
  - [ ] give a list of images in the /images/ repo that are currently not in the database
  - [ ] list all the images that are being used, linked to the page where it's used.
  - [ ] add a JS mouseover to the images that allows you to create a task for removing this image
- [ ] Single page 
  - [ ] Create single URL page, from ID on the URL
    - [ ] Show the page URL 
    - [ ] Show images 
    - [ ] Show Github Urls & count
    - [ ] Show Off page links & count
    - [ ] Show On page links & count
  - [ ] show pages that redirect here

### Tasks

Yeah, yeah, yeah, there are a million task managers. I am customizing and playing and linking. shhh... shhh.... It's going to be OK.

- [ ] list all the tasks 


### Later Stuff

Extra Features

- [ ] How to add code hooks, that allow adding in extra functionality dynamically without screwing up the source?
  - [ ] obfuscate the github url code away from the html.links functionality

Monitoring

- [ ] watch for github issues with docs pages and add tasks automatically
- [ ] watch specific private github repos for builds and make tasks from them to update documentation - prioritize at top of the task list

Scraper

- [ ] Identify .htaccess/other redirects
