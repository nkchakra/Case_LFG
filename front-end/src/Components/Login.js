import React, { Component } from 'react';
import {FormGroup, FormControl,HelpBlock, ControlLabel, DropdownButton, MenuItem, Button} from 'react-bootstrap';
import '../styles/Login.css';
import { BrowserRouter, Router, Route, Link, Switch } from "react-router-dom";
import Feed from './../Components/Feed';
import Post from './../Components/Post';
import Home from './../Components/Home';

class Login extends Component{

	constructor(props){
		super(props);

		this.handleLoginUsernameChange = this.handleLoginUsernameChange.bind(this);
		this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
		this.dropdownSelect = this.dropdownSelect.bind(this);	

		this.state = {
			loginUsername: '',
			loginPassword: '',
			DropdownTitle: 'Login'
		};
	}

	handleLoginUsernameChange(e){
		this.setState({loginUsername: e.target.value})
	}

	handleLoginPasswordChange(e1){
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
	

//Have login there initially, if user clicks create an account render/dropdown the create account section 
	render(){
		return (
			<BrowserRouter>
				<div className="loginContainer">
					<div className="loginHeader">
						<h2>Login your account</h2>
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
							<Button bsStyle="primary" bsSize="large">{this.state.DropdownTitle}</Button>
						</Link>
					</div>
					<div>
						<Switch>
							<Route path="/home" render={(props) => <Home {...props} username={this.state.loginUsername}/>}/> 
						</Switch>
					</div>
				</div>
			</BrowserRouter>
			);
	}

}
export default Login;