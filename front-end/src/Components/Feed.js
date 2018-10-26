import React, { Component } from 'react';
import {Tab, Tabs} from 'react-bootstrap';

function categorize(term){
    console.log("derp");
    return function(x){

        var table = '';
        if (x.category.toLowerCase().includes(term.toLowerCase())){
            return table += x.username + ": " +  x.description;
        }
    }
}

class Feed extends Component {


//framework of getting data using ajax
//    getData(){
//      $.ajax(
//            {
//                type: 'get',
//                url: url,
//                success: function (data) {
//                    this.setState({ data: JSON.parse(data) })  //or parse
//                }.bind(this)
//            },
//
//        );
//    }

 constructor(){
     super()
       this.state = {
         data: [{
                   "username":"byrrice",
                   "date_posted":"08/21/18 7pm",
                   "post_id":"2131",
                   "description":"Looking for basketball group at 7 pm",
                   "category":"Sports",
                   "time_posted":"6:21pm",
                   "time_exist":"2 hours",
                   "Images": "None",
                   "Links":"https://en.wikipedia.org/wiki/Basketball",
                   "Tag_List": "Baketball, group, Veale",
                   "comments": {
                       "usernames": "vishthefish, niknak",
                       "comment_ids": "23141, 32141"
                   }
                }]
       };

       //for posting method later on
        //this.getData = this.getData.bind(this);
   }
 //will recieve data from backend here, for now using dummy response object I created
 //ideally will be more formatted than this when website goes on
  render() {

    return (
        <div className="main-feed">
        <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
          <Tab eventKey={1} title="Tab 1">
            Tab 1 content
          </Tab>
          <Tab eventKey={2} title="Tab 2">
            Tab 2 content
          </Tab>
          <Tab eventKey={3} title="Tab 3">
            Tab 3 content
          </Tab>
        </Tabs>;
        <style>{`
              *{
                  box-sizing: border-box;
              }

              .column1 {
                  float: left;
                  width: 33.33%;
                  padding: 10px;
                  background-color:#aaa;
              }
              .column2 {
                    float: left;
                    width: 33.33%;
                    padding: 10px;
                    background-color:#bbb;
                }
                {/*
              .column3 {
                  float: left;
                  width: 33.33%;
                  padding: 10px;
                  background-color:#aaa;
              }
              */}

              .row:after {
                  content: "";
                  display: table;
                  clear: both;
              }
      `}</style>
        <center>

          <ul  className = "list-group">{this.state.data.map(function(item, key) {
                   return (
                   <div>
                      <h1 size = "20">Main Feed</h1>
                       <div class="row">
                         <div class="column1">
                           <h2>Sports</h2>
                           {categorize("Sports")}
                         </div>
                         <div class="column2">
                           <h2>Videogames</h2>
                           {categorize("Videogames")}
                         </div>
                         <div class="column1">
                           <h2>Miscellaneous</h2>
                           {categorize("Misc")}
                         </div>
                       </div>
                   </div>
                    )

                 })}</ul>
        </center>
        </div>
    );
  }
}

export default Feed;