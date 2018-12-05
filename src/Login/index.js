import React from 'react'
import { Form, Button, Grid, Segment, Divider } from 'semantic-ui-react';

const Login = (props) => {
	return (
		<div>
		<Segment>
			<Divider hidden />
		</Segment>
		<Grid columns={2} divided textAlign='center' style={{ width: '100%' }} verticalAlign='top' stackable>
			<Grid.Column>
				<Form onSubmit={props.handleSubmit}>
					<Form.Group>
						<Form.Input label='Username' placeholder='Username' type='text' name='username' width={6} onChange={props.handleChange} /> 
					</Form.Group>
					<Form.Group>
						<Form.Input label='Password' placeholder='Password' type='password' name='password' width={6} onChange={props.handleChange} />
					</Form.Group>
					<Form.Group>
						<Button type='Submit'>Login</Button>
					</Form.Group>
				</Form>
			</Grid.Column>
		</Grid>
		</div>
	)
}


export default Login;