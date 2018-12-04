import React, { Component } from 'react';
import { Form, Button, Segment, Header, Dropdown } from 'semantic-ui-react';
import { breeds, people, dogs, fixed } from '../Variables/variables.js'

class CreatePet extends Component {
	constructor(){
		super();
		this.state = {
			first_name: '',
				middle_name: '',
				last_name: '',
				pet_photo: '',
				age: 0,
				breed: '',
				weight: 0,
				likes_people: '',
				likes_dogs: '',
				loves_to: '',
				fav_treat: '',
				vet_name: '',
				vet_phone: '',
				vet_address: '',
				fixed: '',
				owner: null,
				_id: ''

		}
	}
	updatePet = (e) => {
		this.setState({[e.currentTarget.name]: e.currentTarget.value})
	}
	breedData = (e, data) => {
		this.setState({breed: data.value})
	}
	peopleData = (e, data) => {
		this.setState({likes_people: data.value})
	}
	dogsData = (e, data) => {
		this.setState({likes_dogs: data.value})
	}
	fixedData = (e, data) => {
		this.setState({fixed: data.value})
	}
	render() {
		return (
			<Segment>
				<Header>Share Your Pet With The World!</Header>
				<Form onSubmit={this.props.addPet.bind(null, this.state)}>
					<Form.Group unstackable widths={2}>
						<Form.Input label='First Name' type='text' placeholder='First Name?' name='first_name' width={6} value={this.state.first_name} onChange={this.updatePet}/>
						<Form.Input label='Middle Name' type='text' placeholder='Middle Name?' name='middle_name' width={4} value={this.state.middle_name} onChange={this.updatePet}/>
						<Form.Input label='Last Name' type='text' placeholder='Last Name?' name='last_name' width={6} value={this.state.last_name} onChange={this.updatePet}/>
					</Form.Group>
					<Form.Group>
					</Form.Group>
					<Form.Group>
						<Form.Input label='Age' type='number' placeholder='Age?' name='age' width={2} value={this.state.age} onChange={this.updatePet}/>
						<Form.Input label='Weight' type='text' placeholder='Weight?' name='weight' width={5} value={this.state.weight} onChange={this.updatePet}/>
						<Form.Input label='Photo URL' type='text' placeholder='Photo URL' name='pet_photo' width={9} value={this.state.pet_photo} onChange={this.updatePet}/>
					</Form.Group>
						<Dropdown label='Spayed/Neutered?' type='text' placeholder='Spayed/Neutered?' name='fixed' width={8} value={this.state.fixed} fluid selection options={fixed} onChange={this.fixedData} />
						<Dropdown label='Breed' type='text' placeholder='Breed?' name='breed' width={8} fluid search selection options={breeds} onChange={this.breedData} />
						<Dropdown label='Good With People?' type='text' placeholder='Good With People?' name='likes_people' width={8} value={this.setState.likes_people} fluid selection options={people} onChange={this.peopleData} />
						<Dropdown label='Good With Dogs?' type='text' placeholder='Good With Dogs?' width={8} value={this.state.likes_dogs} fluid selection options={dogs} onChange={this.dogsData} />
					<Form.Group>
						<Form.Input label='Favorite Thing To Do?' type='text' placeholder='Favorite Thing to Do?' name='loves_to' width={16} value={this.state.loves_to} onChange={this.updatePet}/>
					</Form.Group>
					<Form.Group>
						<Form.Input label='Favorite Treat' type='text' placeholder='Favorite Treat?' name='fav_treat' width={16} value={this.state.fav_treat} onChange={this.updatePet}/>
					</Form.Group>
					<Button type='Submit'>Add New Pet</Button>
				</Form>
			</Segment>		
		)
	}
}

export default CreatePet;