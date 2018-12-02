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
						<Label>Breed</Label>
						<Form.Input type='text' name='breed' value={props.petToEdit.breed} onChange={props.handlePetEditChange}/>
						<Button type='Submit'>Edit Pet Info</Button>
					</Form>
				</Modal.Content>
			</Modal>
		</TransitionablePortal>
	)
}

export default EditPet;