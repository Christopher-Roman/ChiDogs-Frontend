import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react'

const PhotoList = (props) => {
	const photos = props.photos.map((photo, i) => {
		return (
			<Card key={photo.id}>
				<Card.Content>
					<Image src={photo.picture_url} />
				</Card.Content>
				<Button floated='left' color='green' size='large' onClick={props.openPhotoModal.bind(null, photo)}>View</Button>
				<Button floated='right' color='red' size='mini' onClick={props.deletePhoto.bind(null, photo.id)}>Delete Photo</Button>
			</Card>
		)
	})
	return (
		<div>
			<h2>Photos!</h2>
			<Card.Group>
				{photos}
			</Card.Group>
		</div>
	)
}

export default PhotoList;