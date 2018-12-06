import React, { Component } from 'react';
import getCookie from 'js-cookie';
import apiUrl from '../apiURL.js'
import { Form, Button, Grid, Message, Segment } from 'semantic-ui-react';

class Register extends Component {
	constructor(){
		super();
		this.state = {
			username: '',
			email: '',
			password: '',
			isValid: true
		}
	}
	registrationFailed = () => {
		this.setState({
			isValid: false
		})
	}
	handleChange = (e) => {
		e.preventDefault();
		this.setState({[e.currentTarget.name]: e.currentTarget.value});
	}
	handleSubmit = async (e) => {
		const csrfCookie = getCookie('csrftoken');
		const registerReponse = await fetch(apiUrl + '/users/', {
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
			this.state.isValid = true
			this.props.history.push('/profile')
		}
		else {
			this.registrationFailed()
			console.log('Could Not Register. Please try again.');
		}
	}
	render(){
		return (
			<Grid columns={5} divided style={{ height: '100%' }} verticalAlign='top' centered>
				<Grid.Column>
					<Segment>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group>
								<Form.Input label='Username' placeholder='Username' type='text' name='username' onChange={this.handleChange} /> 
							</Form.Group>
							<Form.Group>
								<Form.Input label='Email' placeholder='Email' type='email' name='email' onChange={this.handleChange} />
							</Form.Group>
							<Form.Group>
								<Form.Input label='Password' placeholder='Password' type='password' name='password' onChange={this.handleChange} />
							</Form.Group>
								<Message hidden={this.state.isValid} negative>
									The username is already being used.
								</Message>
							<Form.Group>
								<Button type='Submit'>Register</Button>
							</Form.Group>
						</Form>
					</Segment>
				</Grid.Column>
			</Grid>
		)
	}
}

export default Register;