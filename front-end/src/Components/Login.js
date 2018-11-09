import React, { Component } from 'react';
import {FormGroup, FormControl,HelpBlock, ControlLabel} from 'react-bootstrap';
import '../styles/Login.css';


class Login extends Component{

	constructor(props){
		super(props);

		this.handleUsernameChange = this.handleUsernameChange.bind(this);

		this.state = {
			username: ''
		};
	}

	handleUsernameChange(e){
		this.setState({username: e.target.value})
	}



	//See form component in react bootstrap
	getValidationState(){
		const usernameLength = this.state.username.length;
		if (usernameLength <= 2){
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
					<form>
				        <FormGroup
				          controlId="formBasicText"
				          validationState={this.getValidationState()}
				        >
				          <ControlLabel>Working example with validation</ControlLabel>
				          <FormControl
				            type="text"
				            value={this.state.username}
				            placeholder="Enter text"
				            onChange={this.handleUsernameChange}
				          />
				          <FormControl.Feedback />
				          <HelpBlock>username must have at least 3 characters</HelpBlock>
				        </FormGroup>
				     </form>
				</div>
			</div>
			);
	}

}
export default Login;