import React, { Component } from 'react';
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
                   "subject":"Looking for basketball group at 7 pm",
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
        <center>
            <table>
                <td>Post ID |</td>
                <td>Subject |</td>
                <td>Category |</td>
                <td>Time Posted</td>
            </table>
            <table>
              <tbody>{this.state.data.map(function(item, key) {
                       return (
                          <tr key = {key}>
                              <td>{item.post_id} |</td>
                              <td>{item.subject} |</td>
                              <td>{item.category} |</td>
                              <td>{item.time_posted} </td>
                          </tr>
                        )

                     })}</tbody>
               </table>
        </center>
        </div>
    );
  }
}

export default Feed;