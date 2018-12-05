import React from 'react';
import { Modal, Form, Button, Header, TransitionablePortal, Dropdown } from 'semantic-ui-react'
import { breeds, people, dogs, fixed } from '../Variables/variables.js'

const EditPet = (props) => {
	return (
		<TransitionablePortal open={props.open} transition={{ animation: 'fly down', duration: 600}}>
			<Modal open={props.open}>
				<Header>{props.petToEdit.first_name}</Header>
				<Modal.Content>
					<Form onSubmit={props.closeAndEditPet}>
						<Form.Group unstackable widths={2}>
							<Form.Input label='First Name' type='text' placeholder='First Name?' name='first_name' width={6} value={props.petToEdit.first_name} onChange={props.handlePetEditChange}/>
							<Form.Input label='Middle Name' type='text' placeholder='Middle Name?' name='middle_name' width={4} value={props.petToEdit.middle_name} onChange={props.handlePetEditChange}/>
							<Form.Input label='Last Name' type='text' placeholder='Last Name?' name='last_name' width={6} value={props.petToEdit.last_name} onChange={props.handlePetEditChange}/>
						</Form.Group>
						<Form.Group>
						</Form.Group>
						<Form.Group>
							<Form.Input label='Age' type='number' placeholder='Age?' name='age' width={2} value={props.petToEdit.age} onChange={props.handlePetEditChange}/>
							<Form.Input label='Weight' type='text' placeholder='Weight?' name='weight' width={5} value={props.petToEdit.weight} onChange={props.handlePetEditChange}/>
							<Form.Input label='Photo URL' type='text' placeholder='Photo URL' name='pet_photo' width={9} value={props.petToEdit.pet_photo} onChange={props.handlePetEditChange}/>
						</Form.Group>
							<Dropdown defaultValue={props.petToEdit.fixed} label='Spayed/Neutered?' type='text' placeholder='Spayed/Neutered?' name='fixed' width={8} fluid selection options={fixed} onChange={props.fixedData} />
							<Dropdown defaultValue={props.petToEdit.breed} label='Breed' type='text' placeholder='Breed?' name='breed' width={8} fluid search selection options={breeds} onChange={props.breedData} />
							<Dropdown defaultValue={props.petToEdit.likes_people} label='Good With People?' type='text' placeholder='Good With People?' name='likes_people' width={8} fluid selection options={people} onChange={props.peopleData} />
							<Dropdown defaultValue={props.petToEdit.likes_dogs} label='Good With Dogs?' type='text' placeholder='Good With Dogs?' name='likes_dogs' width={8} fluid selection options={dogs} onChange={props.dogsData} />
						<Form.Group>
							<Form.Input label='Favorite Thing To Do?' type='text' placeholder='Favorite Thing to Do?' name='loves_to' width={16} value={props.petToEdit.loves_to} onChange={props.handlePetEditChange}/>
						</Form.Group>
						<Form.Group>
							<Form.Input label='Favorite Treat' type='text' placeholder='Favorite Treat?' name='fav_treat' width={16} value={props.petToEdit.fav_treat} onChange={props.handlePetEditChange}/>
						</Form.Group>
						<Button type='Submit'>Edit Pet Info</Button>
					</Form>
				</Modal.Content>
			</Modal>
		</TransitionablePortal>
	)
}

export default EditPet;