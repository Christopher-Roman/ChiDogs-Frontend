import React, { Component } from 'react';
import getCookie from 'js-cookie';
import { Form, Label, Button } from 'semantic-ui-react';

class Register extends Component {
	constructor(){
		super();
		this.state = {
			username: '',
			email: '',
			password: ''
		}
	}
	handleChange = (e) => {
		e.preventDefault();
		this.setState({[e.currentTarget.name]: e.currentTarget.value});
	}
	handleSubmit = async (e) => {
		const csrfCookie = getCookie('csrftoken');
		const registerReponse = await fetch('http://localhost:8000/users/', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfCookie
			}
		});

		const parsedResponse = await registerReponse.json();
		if(parsedResponse.data === 'Registration Successful') {
			// this.props.history.push('/profile')
		}
		else {
			console.log('Could Not Register. Please try again.');
		}
	}
	render(){
		return (
			<Form onSubmit={this.handleSubmit}>
				<Label>Username</Label>
				<Form.Input type='text' name='username' onChange={this.handleChange} />
				<Label>Email</Label>
				<Form.Input type='text' name='email' onChange={this.handleChange} />
				<Label>Password</Label>
				<Form.Input type='password' name='password' onChange={this.handleChange} />
				<Button type='Submit'>Register</Button>
			</Form>
		)
	}
}

export default Register;