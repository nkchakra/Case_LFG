import React, { Component } from 'react';
import {Jumbotron, Button, Carousel} from 'react-bootstrap';
import '../styles/Welcome.css';
class Welcome extends Component{
	render(){
		return(
	        <div className="welcome-component">
	          <Jumbotron>
	            <h1>Welcome Groupie!</h1>
	            <div className="welcome-text">
	              Welcome to Case LFG! Where students come to find other students for activities, groups, and fun!
	            </div>
	            <div className="welcome-button">
	              <Button bsStyle="secondary" className="get-started">Get Started</Button>
	            </div>
	          </Jumbotron>
	          <Carousel>
  <Carousel.Item>
    <img width={900} height={500} alt="900x500" src="/carousel.png" />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img width={900} height={500} alt="900x500" src="/carousel.png" />
    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img width={900} height={500} alt="900x500" src="/carousel.png" />
    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
	        </div>
		);
	}
}

export default Welcome;