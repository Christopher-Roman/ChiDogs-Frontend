import React, { Component } from 'react';
import { Form, Button, Segment, Label } from 'semantic-ui-react';

class CreatePhoto extends Component {
	constructor() {
		super();

		this.state = {
			picture_url: ''
		}
	}
	updatePhoto = (e) => {
		this.setState({[e.currentTarget.name]: e.currentTarget.value})
	}
	render() {
		return (
			<Segment>
				<h4>Add Photo</h4>
				<Form onSubmit={this.props.addPhoto.bind(null, this.state)}>
					<Label>Photo URL</Label>
					<Form.Input type='text' name='picture_url' value={this.state.picture_url} onChange={this.updatePhoto} />
					<Button color='green' type='Submit'>Add Photo</Button>
				</Form>
			</Segment>
		)
	}
}

export default CreatePhoto;