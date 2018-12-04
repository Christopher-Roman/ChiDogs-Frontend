import React, { Component } from 'react';
import CreatePet from '../CreatePet';
import PetView from '../PetView';
import PetList from '../PetList';
import EditPet from '../EditPet';
import getCookie from 'js-cookie';
import { Grid, Message } from 'semantic-ui-react';

class PetContainer extends Component {
	constructor() {
		super();

		this.state = {
			pets: [],
			petToEdit: {
				first_name: '',
				middle_name: '',
				last_name: '',
				pet_photo: '',
				age: null,
				breed: '',
				weight: null,
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
			},
			petToView: {
				first_name: '',
				middle_name: '',
				last_name: '',
				pet_photo: '',
				age: null,
				breed: '',
				weight: null,
				likes_people: '',
				likes_dogs: '',
				loves_to: '',
				fav_treat: '',
				vet_name: '',
				vet_phone: '',
				vet_address: '',
				owner: null,
				fixed: '',
				_id: ''
			},
			showPetEditModal: false,
			petViewModal: false,
			isLoggedIn: true,
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
			if(pets.message === 'Must be logged in.') {
				this.setState.isLoggedIn = true
			} else {
				this.setState({pets: pets.data})
			}
		}).catch((err) => {
			console.log(err);
		})
	}
	addPet = async (pet, e) => {
		e.preventDefault();
		pet.age = parseInt(pet.age)
		pet.weight = parseInt(pet.weight)
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
	openViewPetModal = (pet) => {
		this.setState({
			petViewModal: true,
			petToView: {
				...pet
			}
		})
	}
	breedData = (e, data) => {
		this.setState({
			petToEdit: {
				...this.state.petToEdit,
				breed: data.value
			}	
		})
	}
	peopleData = (e, data) => {
		this.setState({
			petToEdit: {
				...this.state.petToEdit,
				likes_people: data.value
			}
		})
	}
	dogsData = (e, data) => {
		this.setState({
			petToEdit: {
				...this.state.petToEdit,
				likes_dogs: data.value
			}
		})
	}
	fixedData = (e, data) => {
		this.setState({
			petToEdit: {
				...this.state.petToEdit,
				fixed: data.value
			}
		})
	}
	closeViewPetModal = (pet) => {
		this.setState({
			petViewModal: false,
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
					pet_photo: this.state.petToEdit.pet_photo,
					age: parseInt(this.state.petToEdit.age),
					breed: this.state.petToEdit.breed,
					weight: this.state.petToEdit.weight,
					likes_people: this.state.petToEdit.likes_people,
					likes_dogs: this.state.petToEdit.likes_dogs,
					loves_to: this.state.petToEdit.loves_to,
					fav_treat: this.state.petToEdit.fav_treat,
					vet_name: this.state.petToEdit.vet_name,
					vet_phone: this.state.petToEdit.vet_phone,
					vet_address: this.state.petToEdit.vet_address,
					fixed: this.state.petToEdit.fixed
				}),
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrfCookie
				}
			})
			const editPetResponse = await editPet.json();
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
			<Grid columns={2} divided textAlign='center' style={{ height: '100%' }} verticalAlign='top'>
				<Grid.Column>
					<Message hidden={this.state.isLoggedIn} negative>
						You must be logged in to view this page.
					</Message>
				</Grid.Column>
				<Grid.Row>
					<Grid.Column>
						<CreatePet addPet={this.addPet}/>
					</Grid.Column>
					<Grid.Column>
						<PetList pets={this.state.pets} deletePet={this.deletePet} openAndEditPet={this.openAndEditPet}  openViewPetModal={this.openViewPetModal}/>
						<EditPet open={this.state.showPetEditModal} petToEdit={this.state.petToEdit} handlePetEditChange={this.handlePetEditChange} breedData={this.breedData} peopleData={this.peopleData} dogsData={this.dogsData} fixedData={this.fixedData} closeAndEditPet={this.closeAndEditPet} />
						<PetView open={this.state.petViewModal} petToView={this.state.petToView} closeViewPetModal={this.closeViewPetModal} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

export default PetContainer;