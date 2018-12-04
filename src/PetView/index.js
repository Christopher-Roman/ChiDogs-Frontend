import React from 'react';
import { Modal, Button, Image, Header } from 'semantic-ui-react'

const PetView = (props) => {
	console.log(props);
	return (
		<Modal open={props.open}>
			<Modal.Header>{props.petToView.first_name} {props.petToView.middle_name} {props.petToView.last_name}</Modal.Header>
			<Modal.Content image>
				<Image src={props.petToView.pet_photo} wrapped size='medium' />
				<Modal.Description>
					<Header>Age: {props.petToView.age}</Header>
					<Header>Breed: {props.petToView.breed}</Header>
					<Header>Weight: {props.petToView.weight}</Header>
					<Header>Good with People: {props.petToView.likes_people}</Header>
					<Header>Good with Dogs: {props.petToView.likes_dogs}</Header>
					<Header>Favorite Activity: {props.petToView.loves_to}</Header>
					<Header>Favorite Treat: {props.petToView.fav_treat}</Header>
					<Header>Spayed/Neutered: {props.petToView.fixed}</Header>
				</Modal.Description>
			</Modal.Content>
			<Button attached='bottom' color='green' type='submit' onClick={props.closeViewPetModal}>Close</Button>
		</Modal>
	)	
}

export default PetView;