import React from 'react';
import { Modal, Form, Button, Label, Header, TransitionablePortal } from 'semantic-ui-react'

const EditPet = (props) => {
	return (
		<TransitionablePortal open={props.open} transition={{ animation: 'fly down', duration: 600}}>
			<Modal open={props.open}>
				<Header>{props.petToEdit.first_name}</Header>
				<Modal.Content>
					<Form onSubmit={props.closeAndEditPet}>
						<Label>First Name</Label>
						<Form.Input type='text' name='first_name' value={props.petToEdit.first_name} onChange={props.handlePetEditChange}/>
						<Label>Middle Name</Label>
						<Form.Input type='text' name='middle_name' value={props.petToEdit.middle_name} onChange={props.handlePetEditChange}/>
						<Label>Last Name</Label>
						<Form.Input type='text' name='last_name' value={props.petToEdit.last_name} onChange={props.handlePetEditChange}/>
						<Label>Age</Label>
						<Form.Input type='text' name='age' value={props.petToEdit.age} onChange={props.handlePetEditChange}/>
						<Label>Photo</Label>
						<Form.Input type='text' name='pet_photo' value={props.petToEdit.pet_photo} onChange={props.handlePetEditChange}/>
						<Label>Breed</Label>
						<Form.Input type='text' name='breed' value={props.petToEdit.breed} onChange={props.handlePetEditChange}/>
						<Label>Weight</Label>
						<Form.Input type='text' name='weight' value={props.petToEdit.weight} onChange={props.handlePetEditChange}/>
						<Label>Good With People</Label>
						<Form.Input type='text' name='likes_people' value={props.petToEdit.likes_people} onChange={props.handlePetEditChange}/>
						<Label>Good With Dogs</Label>
						<Form.Input type='text' name='likes_dogs' value={props.petToEdit.likes_dogs} onChange={props.handlePetEditChange}/>
						<Label>Favorite Activity</Label>
						<Form.Input type='text' name='loves_to' value={props.petToEdit.loves_to} onChange={props.handlePetEditChange}/>
						<Label>Favorite Treat</Label>
						<Form.Input type='text' name='fav_treat' value={props.petToEdit.fav_treat} onChange={props.handlePetEditChange}/>
						<Label>Vet Name</Label>
						<Form.Input type='text' name='vet_name' value={props.petToEdit.vet_name} onChange={props.handlePetEditChange}/>
						<Label>Vet Phone Number</Label>
						<Form.Input type='text' name='vet_phone' value={props.petToEdit.vet_phone} onChange={props.handlePetEditChange}/>
						<Label>Vet Address</Label>
						<Form.Input type='text' name='vet_address' value={props.petToEdit.vet_address} onChange={props.handlePetEditChange}/>
						<Button type='Submit'>Edit Pet Info</Button>
					</Form>
				</Modal.Content>
			</Modal>
		</TransitionablePortal>
	)
}

export default EditPet;