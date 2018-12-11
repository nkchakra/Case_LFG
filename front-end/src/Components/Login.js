import React, { Component } from 'react';
import {FormGroup, FormControl,HelpBlock, ControlLabel, DropdownButton, MenuItem, Button} from 'react-bootstrap';
import '../styles/Login.css';
import { BrowserRouter, Router, Route, Link, Switch } from "react-router-dom";
import Feed from './../Components/Feed';
import Post from './../Components/Post';
import Home from './../Components/Home';
import NotFound from './../Components/NotFound';

class Login extends Component{

	constructor(props){
		super(props);

		this.handleLoginUsernameChange = this.handleLoginUsernameChange.bind(this);
		this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
		this.dropdownSelect = this.dropdownSelect.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);	
		this.getLoginUsernameValidationState = this.getLoginUsernameValidationState.bind(this);
		this.getLoginPasswordValidationState = this.getLoginPasswordValidationState.bind(this);
		this.setState = this.setState.bind(this);

		this.state = {
			loginUsername: '',
			loginPassword: '',
			DropdownTitle: 'Login',
			validateLogin : false,
			show : `visible`,
		};
	}

	handleLoginUsernameChange(e){
		this.setState({loginUsername: e.target.value})
	}

	handleLoginPasswordChange = (e1) => {
		this.setState({loginPassword: e1.target.value})
	}



	//See form component in react bootstrap
	getLoginUsernameValidationState(){
		const usernameLength = this.state.loginUsername.length;
		if (usernameLength <= 2){
			return 'error';
		}
		else{
			return 'success';
		}
	}

	getLoginPasswordValidationState(){
		const usernameLength = this.state.loginPassword.length;
		if (usernameLength <= 5){
			return 'error';
		}
		else{
			return 'success';
		}
	}

	dropdownSelect(eventKey){
		if (eventKey == 1){
			this.setState({DropdownTitle: 'Login'});
		}
		else{
			this.setState({DropdownTitle: 'Create an Account'});
		}
	}

	handleSubmit = () => {
		const username = this.state.loginUsername;
		const password = this.state.loginPassword;
		console.log('I am within submit');

		if (this.state.DropdownTitle == 'Login'){
			console.log('I am within login');
			var post_data = {
				"queryType":"validateLogin",
				"username": username,
				"password": password,
			}

			var ws = new WebSocket("ws://18.216.17.80:6009");

		    ws.onopen = function() {
		        console.log("sending data..");
		        ws.send(JSON.stringify(post_data));
		        console.log("sent")
		    };

		    ws.onmessage = function (evt) {
		        console.log(evt.data);
		        var result = JSON.parse(evt.data).queryResult;
		        if (result == "success"){
		        	this.setState({validateLogin: true});
		        	this.setState({showStyle : `hidden`});
		        }
		    }.bind(this);

		    ws.onclose = function() {
		      console.log('connection closed');
		    };

		    ws.onerror = function(err) {
		    	console.log(err);
		    };
		}
		else{
			console.log("I am here 3")
			var post_data = {
				"password": password,
				"last_name":"lastName",
				"first_name":"firstName",
				"queryType":"userCreate",
				"username": username
			}

			var ws = new WebSocket("ws://18.216.17.80:6009");

		    ws.onopen = function() {
		        console.log("sending data..");
		        ws.send(JSON.stringify(post_data));
		        console.log("sent")
		    };

		    ws.onmessage = function (evt) {
		        console.log(evt.data);
		        var result = JSON.parse(evt.data).queryResult;
		        if ( result == "success"){
		        	this.setState({validateLogin: true});
		        }
		    }.bind(this);

		    ws.onclose = function() {
		      console.log('connection closed');
		    };

		    ws.onerror = function(err) {
		    	console.log(err);
		    };

		}
	}

	handleCreateAccount(){

	}
	

//Have login there initially, if user clicks create an account render/dropdown the create account section 
	render(){
		const validateLogin = this.state.validateLogin;
		const showStyle = this.state.show;
		return (
			<BrowserRouter>
				<div className="mainContainer">
					<div className="loginContainer">
						<div className="loginHeader">
							<h2>Login to/Create your account</h2>
						</div>
						<div className="loginBody">
							<div className="dropdownSelctor">
								<DropdownButton
							      bsStyle={'primary'}
							      title={this.state.DropdownTitle}
							      key={1}
							      id={`dropdown-basic-${1}`}
							      noCaret
							    >
							      <MenuItem 
							      	eventKey="1" 
							      	onSelect={this.dropdownSelect}
							      	>
							      	Login
							      	</MenuItem>
							      <MenuItem divider />
							      <MenuItem eventKey="2" onSelect={this.dropdownSelect}>Create Account</MenuItem>
							    </DropdownButton>
							</div> 
							<div className="bodyUsername">
								<form>
							        <FormGroup
							          controlId="formBasicText"
							          validationState={this.getLoginUsernameValidationState()}
							        >
							          <ControlLabel>Enter username below</ControlLabel>
							          <FormControl
							            type="text"
							            value={this.state.loginUsername}
							            placeholder="Enter username"
							            onChange={this.handleLoginUsernameChange}
							          />
							          <HelpBlock>username must have at least 3 characters</HelpBlock>
							        </FormGroup>
							    </form>
							</div>
							<div className="bodyPassword">
								<form>
							        <FormGroup
							          controlId="formBasicText"
							          validationState={this.getLoginPasswordValidationState()}
							        >
							          <ControlLabel>Enter password below</ControlLabel>
							          <FormControl
							            type="text"
							            value={this.state.loginPassword}
							            placeholder="Enter Password"
							            onChange={this.handleLoginPasswordChange}
							          />
							          <HelpBlock>password must have at least 6 characters</HelpBlock>
							        </FormGroup>
							    </form>
							</div>
							<Link to="/home">
								<Button bsStyle="primary" bsSize="large" onClick={this.handleSubmit}>{this.state.DropdownTitle}</Button>
							</Link>
						</div>
					</div>
					<div>
						<Switch>
							<Route path="/home" render={(props) =>validateLogin ? <Home {...props} username={this.state.loginUsername}/> : <NotFound/>}/> 
						</Switch>
					</div>
				</div>
			</BrowserRouter>
			);
	}

}
export default Login;