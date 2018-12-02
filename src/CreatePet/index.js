import React, { Component } from 'react';
import { Form, Button, Label, Segment, Header } from 'semantic-ui-react';

class CreatePet extends Component {
	constructor(){
		super();
		this.state = {
			first_name: '',
			middle_name: '',
			last_name: '',
			age: '',
			breed: '',

		}
	}
	updatePet = (e) => {
		this.setState({[e.currentTarget.name]: e.currentTarget.value})
	}
	render() {
		return (
			<Segment>
				<Header>Add a Pet!</Header>
				<Form onSubmit={this.props.addPet.bind(null, this.state)}>
					<Label>First Name</Label>
					<Form.Input type='text' name='first_name' value={this.state.first_name} onChange={this.updatePet}/>
					<Label>Middle Name</Label>
					<Form.Input type='text' name='middle_name' value={this.state.middle_name} onChange={this.updatePet}/>
					<Label>Last Name</Label>
					<Form.Input type='text' name='last_name' value={this.state.last_name} onChange={this.updatePet}/>
					<Label>Age</Label>
					<Form.Input type='text' name='age' value={this.state.age} onChange={this.updatePet}/>
					<Label>Breed</Label>
					<Form.Input type='text' name='breed' value={this.state.breed} onChange={this.updatePet}/>
					<Button type='Submit'>Add New Pet</Button>
				</Form>
			</Segment>		
		)
	}
}

export default CreatePet;