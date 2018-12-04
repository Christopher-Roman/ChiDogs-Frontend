import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react'

const PetList = (props) => {
	const pets = props.pets.map((pet, i) => {
		return (
			<Card key={pet.id}>
				<Card.Content>
					<Image src={pet.pet_photo}/>
				</Card.Content>
				<Card.Content>
					<Card.Header>{pet.first_name}</Card.Header>
				</Card.Content>
					<Button size='large' onClick={props.openViewPetModal.bind(null, pet)}>View</Button>
					<Button size='large' onClick={props.openAndEditPet.bind(null, pet)} positive>Edit Info</Button>
					<Button size='mini' onClick={props.deletePet.bind(null, pet.id)} negative>Remove</Button>
			</Card>
		)
	})
	return (
		<div>
			<h3>Pets</h3>
			<Card.Group className='centered'>
				{pets}
			</Card.Group>
		</div>
	)
}

export default PetList;