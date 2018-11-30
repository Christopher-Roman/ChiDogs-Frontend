import React, { Component } from 'react';
import getCookie from 'js-cookie';
import { Form, Button} from 'semantic-ui-react';

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
			this.props.history.push('/profile')
		}
		else {
			console.log('Could Not Register. Please try again.');
		}
	}
	render(){
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Group>
					<Form.Input label='Username' placeholder='Username' type='text' name='username' onChange={this.handleChange} /> 
				</Form.Group>
				<Form.Group>
					<Form.Input label='Email' placeholder='Email' type='text' name='email' onChange={this.handleChange} />
				</Form.Group>
				<Form.Group>
					<Form.Input label='Password' placeholder='Password' type='password' name='password' onChange={this.handleChange} />
				</Form.Group>
				<Form.Group>
					<Button type='Submit'>Register</Button>
				</Form.Group>
			</Form>
		)
	}
}

export default Register;