import React from 'react';
import { Card, Button } from 'semantic-ui-react'

const PetList = (props) => {
	const pets = props.pets.map((pet, i) => {
		return (
			<Card key={pet.id}>
				<Card.Content>
					<Card.Header>{pet.first_name}</Card.Header>
					<Card.Description>{pet.breed}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<Button color='green'>Edit Pet</Button>
					<Button color='red' onClick={props.deletePet.bind(null, pet.id)}>Remove</Button>
				</Card.Content>
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