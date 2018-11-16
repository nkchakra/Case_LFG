11/16/2018
Gantt chart says I should be working with Nikhil to set up data tables and connecting frontend and backend
Got the get and post requests workingsih
Data tables are formatted correctly across frontend and backend
Set up initial states of all feeds using componentdidmount
Set up refresh button to retrieve data using get request
Have implemented results in all and videogames
Modified Results.js, All.js, Videogames.js, Misc.js, Sports.js, Feed.js




11/09/2018
Gantt Chart says I should be working with Nikhil to set up data tables and connect frontend and backend.
Modified all the files to have consistent parameter names with backend parameters
Have post do basic checking on input (will be fancier later on)
Established connection to backend AWS server finally (mode no cors and nc -l port_number to listen), can post to server
Established framework of getting data, need to implement filtering of data and setting state
Made mock JSON object that get will send, Made mock JSON object that get will return
Eventually, all, sports, videogames, and misc will just be a copy of results that differs only by the category sent in by the get
Modified Feed.js, Results.js, All.js, Videogames.js, Misc.js, Sports.js
Created GET.js, POST.js in MockGETPOST

11/02/2018
Gantt Chart still says I should be working on implementing categories.
Centered the tabs via Feed.css. Made the categories show the proper categorized info (In my components, the ajax
call will call Nikhil's backend function which does handles the lookup in the data tables and returns the right json to be printed)
Categories prettified with ReactBootstrap ListGroup and ListGroupItem
Search implemented in each category, Results will be a form that you enter term in and then will be returned as search is there
(right now, we just put the categories and result in the main feed, will be more dynamic with the backend connectivity, all is implemented
in the way that we want as Results.js has the hard coded all state data, rest display hard coded json objects)
Modified Feed.js, Results.js
Made Feed.css, Sports.js, Misc.js, Videogames.js, All.js

10/26/2018
Gantt Chart says I should be working on implementing categories and helping Nikhil with coding the data table functions.
Commented out some of Post.js showing on main page, as that is supposed to go to backend before displaying (frees up clutter/streamlines process, was initially just for display)
Commented out some of Results.js as that should just be the search searching the backend data tables and returning the relevant data
(then display new webpage with results, should not be editing feed)
Made Feed.js display categories via tabs, added basic functionality for this, will modify next week to properly display by category
Modified Post.js, Feed.js, Results.js


10/19/2018
Gantt Chart says I should still be working on post functionality.
Note that Gantt Chart says I shouldn't be working on implementing backend frontend communication until much much later, so for now should build post framework assuming
we get object from backend.
Updated Post.js to implement the post function so that it currently updates your website when you click submit.
Updated Feed.js to list so that it becomes easier to read and concatenate onto later if need be. Need to remove bullet points.
Merged Feed and Result to look off the same main feed. (Feed is extraneous, but kept around for legacy purposes)
Essentially what happens is that post -> feeds json to backend -> sends data table to frontend -> stores in main feed which results and feed look off (to be implemented)
Modified Post.js, Feed.js, Results.js

10/12/2018
Gantt Chart says I should be working on Post functionality. Built the basic framework; since we don't have the main page built yet, wrote the post framework directly
on the welcome page (will port over to main page when done). When the backend is set up ,I'll work on posting the data to the backend (I've set up framework for fetching data). 
Ideally, what will happen is that you will enter all the data in the create post; it will go to backend data tables; backend sends it back; it prints out on mainpage. I'll be
setting this up next week/if nikhil sets up the backend. Added Results.js to main page as component, so search filter works. For now, I've just been working with dummy objects
that I create, so hopefully when nikhil sets everything up, I'll just have to make a slight few changes.  
Created Post.js, modified Feed.js, modified Results.js

10/5/2018
Gantt Chart says I should be working on implementing filter functionality. 
For now, I'm working on a dummy React Object in order to do basic search filtering. When we fully implement backend's data tables, I will adjust the script accordingly
to get the backend data tables and filter through the results instead of just a front end dummy object (will have to read up and implement nodejs for this). 
Due to this, I spent some time working on researching React (how to install and create a basic component). npm install, then npm start in case-lfg folder to load. 
Created folder Components and inside file Results.js.

09/28/2018
Gantt Chart says I should be working on mapping out JSON Objects. 
I spent some time reading up on JSON formatting, JSON Response Objects, and general frontend backend communciation. 
Response objects should be what is communicated between the frontend and backend containing the relevant data needed. 
Waiting on Vishal and Nikhil to set up the basic framework of backend and framework to start working on the functions between the two. 
Created pseudocode files user.json, post.json, comment.json to mimic response objects.

