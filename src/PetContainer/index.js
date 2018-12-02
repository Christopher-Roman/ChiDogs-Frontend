import React, { Component } from 'react';
import CreatePet from '../CreatePet';
import PetList from '../PetList';
import EditPet from '../EditPet';
import getCookie from 'js-cookie';
import { Grid } from 'semantic-ui-react';

class PetContainer extends Component {
	constructor() {
		super();

		this.state = {
			pets: [],
			petToEdit: {
				first_name: '',
				middle_name: '',
				last_name: '',
				age: null,
				breed: '',
				owner: null,
				_id: ''
			},
			showPetEditModal: false,
		}
	}
	getPet = async () => {
		const csrfCookie = getCookie('csrftoken');
		const pets = await fetch('http://localhost:8000/profile/pets/', {
			'credentials': 'include',
			headers: {
				'X-CSRFToken': csrfCookie
			}
		});
		const petsParsedResponse = pets.json()
		return petsParsedResponse
	}
	componentDidMount(){
		// Mounting Pet API call
		this.getPet().then(pets => {
			this.setState({pets: pets.data})
		}).catch((err) => {
			console.log(err);
		})
	}
	addPet = async (pet, e) => {
		e.preventDefault();
		pet.age = parseInt(pet.age)
		const csrfCookie = getCookie('csrftoken');

		try {
			const newPet = await fetch('http://localhost:8000/profile/pets/', {
		        method: 'POST',
		        credentials: 'include',
		        body: JSON.stringify(pet),
		        headers: {
		          'Content-Type': 'application/json',
		          'X-CSRFToken': csrfCookie
				}
			})
			console.log(newPet);
			const newPetParsed = await newPet.json();
			this.setState({pets: [...this.state.pets, newPetParsed.data]})
		} catch(err){
			console.log(err);
		}
	}
	openAndEditPet = (pet) => {
		this.setState({
			showPetEditModal: true,
			petToEdit: {
				...pet
			}
		})
	}
	handlePetEditChange = (e) => {
		this.setState({
			petToEdit: {
				...this.state.petToEdit,
				[e.currentTarget.name]: e.currentTarget.value
			}
		});
	}
	closeAndEditPet = async (e) => {
		e.preventDefault();
		try {
			const csrfCookie = getCookie('csrftoken');
			const editPet = await fetch('http://localhost:8000/profile/pets/' + this.state.petToEdit.id + '/', {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify({
					first_name: this.state.petToEdit.first_name,
					middle_name: this.state.petToEdit.middle_name,
					last_name: this.state.petToEdit.last_name,
					age: parseInt(this.state.petToEdit.age),
					breed: this.state.petToEdit.breed
				}),
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrfCookie
				}
			})
			const editPetResponse = await editPet.json();
			console.log(editPetResponse);
			const newPetArrayWithEdit = this.state.pets.map((pet) => {
				if(pet.id === editPetResponse.data.id){
					pet = editPetResponse.data
				}
				return pet
			})
			this.setState({
				showPetEditModal: false,
				pets: newPetArrayWithEdit
			})
		} catch(err) {
			console.log(err);
		}
	}
	deletePet = async (id) => {
		try {
			const csrfCookie = getCookie('csrftoken');
			const deletePet = await fetch('http://localhost:8000/profile/pets/' + id, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrfCookie
				}
			})
			// const deletedPetParsed = await deletePet.json()
			this.setState({
				pets: this.state.pets.filter((pet) => pet.id !== id) 
			})
		} catch(err) {
			console.log(err);
		}
	}
	render(){
		return(
			<Grid columns={3} divided textAlign='center' style={{ height: '100%' }} verticalAlign='top' stackable>
				<Grid.Column>
					<CreatePet addPet={this.addPet}/>
				</Grid.Column>
				<Grid.Column>
					<PetList pets={this.state.pets} deletePet={this.deletePet} openAndEditPet={this.openAndEditPet} />
					<EditPet open={this.state.showPetEditModal} petToEdit={this.state.petToEdit} handlePetEditChange={this.handlePetEditChange} closeAndEditPet={this.closeAndEditPet} />
				</Grid.Column>
			</Grid>
		)
	}
}

export default PetContainer;