import React, { Component } from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import '../styles/Feed.css';
import Misc from './Misc';
import Videogames from './Videogames';
import Sports from './Sports';
import All from "./All"
import Results from "./Results"

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


       //for posting method later on
        //this.getData = this.getData.bind(this);
   }
 //will recieve data from backend here, for now using dummy response object I created
 //ideally will be more formatted than this when website goes on

/*<ul  className = "list-group">{this.state.data.map(function(item, key) {
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

     })}</ul>*/
  render() {

    return (
        <div className="main-feed">
            <h1 size="30">Main Feed</h1>
            <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
              <Tab eventKey={1} title="All">
                <Results/>
                <All/>
              </Tab>
              <Tab eventKey={2} title="Sports">
              <Results/>
                <Sports/>
              </Tab>
              <Tab eventKey={3} title="Videogames">
              <Results/>
                <Videogames/>
              </Tab>
              <Tab eventKey={4} title="Misc.">
              <Results/>
                <Misc/>
              </Tab>
            </Tabs>
        </div>

    );
  }
}

export default Feed;