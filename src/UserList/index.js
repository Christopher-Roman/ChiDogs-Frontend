import React from 'react';
import { Card, Button, Image, Grid, Header, Divider } from 'semantic-ui-react';

const UserList = (props) => {
	const pet = props.pets.map((pet, i) => {
		return (
				<Grid.Column key={pet.id}>
				<Divider hidden/>
					<Card >
						<Divider hidden />
						<Image size='small' centered src={pet.pet_photo} />
						<Header>{pet.first_name}</Header>
						<Divider />
						<Card.Content>
							{pet.likes_dogs}
						</Card.Content>
						<Card.Content>
							{pet.likes_people}
						</Card.Content>
						<Card.Content>
							Loves {pet.loves_to}
						</Card.Content>
						<Button size='large' color='green'>View</Button>
					</Card>
				</Grid.Column>
		)
	})
	return (
		<div>
			<h3>All User's Pets!</h3>	
			<Grid.Row columns={5}>
				<Card.Group className='centered'>
					{pet}
				</Card.Group>
			</Grid.Row>
		</div>
	)
}


export default UserList;