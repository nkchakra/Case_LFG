import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
            ],
        }
    }

    componentDidMount() {
        this.setState({
            data: [
                {
                    user: "byrrice",
                    comment: "I'll be there at 3",                
                },
                {
                    user: "niknak",
                    comment: "Cool, I'll be there by 3:30",
                }
            ]
        });
    }

    render(){
        const{data} = this.state;
        return (
            <div className = "comment">
                <ListGroup>
                {data.map(data =>
                    <div key = {data.comment}>
                        <ListGroupItem>{data.comment}</ListGroupItem>
                    </div>)}
                </ListGroup>       
             </div>
        )
    }
}

export default Comments;