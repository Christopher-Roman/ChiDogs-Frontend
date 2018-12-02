import React, { Component } from 'react';
import { Form, Button, Label, Segment, Header } from 'semantic-ui-react';

class CreatePost extends Component {
	constructor() {
		super();

		this.state = {
			post_body: '',
		}
	}
	updatePost = (e) => {
		this.setState({[e.currentTarget.name]: e.currentTarget.value})
	}
	render(){
		return(
			<Segment>
				<Header>Create a Post</Header>
				<Form onSubmit={this.props.addPost.bind(null, this.state)}>
					<Label>Post</Label>
					<Form.TextArea type='text' name='post_body' value={this.state.post_body} placeholder='Fun plans? Found a new park? Let people know!' onChange={this.updatePost} />
					<Button color='green' type='Submit'>Create Post</Button>
				</Form>
			</Segment>
		)
	}
}

export default CreatePost;