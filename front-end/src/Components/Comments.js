import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import '../styles/Home.css';


class Comments extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const post_comments = this.props.commentObject;
    }

    
    render(){
        const post_comments = this.props.commentObject;
        return (
            <div className = "commentContainer">
                <ListGroup>
                {post_comments && Object.keys(post_comments).map(data =>
                    <ListGroupItem>
                        <div className="comment">
                            <div className="username">{data.split(':')[0]}</div>
                            <div className="commentContent">"{post_comments[data]}"</div>
                        </div>
                    </ListGroupItem>
                    )
                }
                </ListGroup>       
             </div>
        );
    }
}

export default Comments;