import React, { Component } from 'react';
import {FormGroup, FormControl,HelpBlock, ControlLabel, DropdownButton, MenuItem, } from 'react-bootstrap';
import '../styles/Login.css';


class Login extends Component{

	constructor(props){
		super(props);

		this.handleLoginUsernameChange = this.handleLoginUsernameChange.bind(this);
		this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);

		this.state = {
			loginUsername: '',
			loginPassword: ''
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
	

//Have login there initially, if user clicks create an account render/dropdown the create account section 
	render(){
		return (
			<div className="loginContainer">
				<div className="loginHeader">
					<h2>Login your account</h2>
				</div>
				<div className="loginBody">
					<div className="dropdownSelctor">
						<DropdownButton
					      bsStyle={'Primary'}
					      title={'Select mode'}
					      key={1}
					      id={`dropdown-basic-${1}`}
					    >
					      <MenuItem eventKey="1">Login</MenuItem>
					      <MenuItem divider />
					      <MenuItem eventKey="2">Create Account</MenuItem>
					    </DropdownButton>
					</div> 
					<div className="bodyUsername">
						<form>
					        <FormGroup
					          controlId="formBasicText"
					          validationState={this.getLoginUsernameValidationState()}
					        >
					          <ControlLabel>Working example with validation</ControlLabel>
					          <FormControl
					            type="text"
					            value={this.state.loginUsername}
					            placeholder="Enter text"
					            onChange={this.handleLoginUsernameChange}
					          />
					          <FormControl.Feedback />
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
					          <ControlLabel>Working example with validation</ControlLabel>
					          <FormControl
					            type="text"
					            value={this.state.loginPassword}
					            placeholder="Enter text"
					            onChange={this.handleLoginPasswordChange}
					          />
					          <FormControl.Feedback />
					          <HelpBlock>password must have at least 6 characters</HelpBlock>
					        </FormGroup>
					    </form>
					</div>
				</div>
			</div>
			);
	}

}
export default Login;