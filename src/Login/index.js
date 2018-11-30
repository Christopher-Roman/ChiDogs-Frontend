import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import getCookie from 'js-cookie';

class Login extends Component {
	constructor(){
		super();

		this.state = {
			username: '',
			password: '',
			isValid: true,
			logOut: true
		}
	}
	loginFailed = () => {
		this.setState({
			isValid: false
		})
	}
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		const csrfCookie = getCookie('csrftoken');
		try {
			const loginResponse = await fetch('http://localhost:8000/users/login/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'X-CSRFToken': csrfCookie,
					'Content-Type': 'application/json'
				}
			});
			const parsedResponse = await loginResponse.json();
			if(parsedResponse.data === 'Login Successful') {
				this.state.isValid = true
				this.props.history.push('/profile')
			} else {
				this.loginFailed()
			}
		} catch(err) {
			console.log(err);
		}	
	}
	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<Message hidden={this.state.isValid}>
					The Username/Password is incorrect. Please try again.
				</Message>
				<Message hidden={this.state.logOut}>
					Logout Successful.
				</Message>
				<Form.Group>
					<Form.Input label='Username' placeholder='Username' type='text' name='username' width={6} onChange={this.handleChange} /> 
				</Form.Group>
				<Form.Group>
					<Form.Input label='Password' placeholder='Password' type='password' name='password' width={6} onChange={this.handleChange} />
				</Form.Group>
				<Form.Group>
					<Button type='Submit'>Login</Button>
				</Form.Group>
			</Form>
		)
	}
}

export default Login;