import React from 'react';
import { Modal, Button, Image, TransitionablePortal } from 'semantic-ui-react'

const ViewPhoto = (props) => {
	return (
		<TransitionablePortal open={props.open} transition={{ animation: 'fly down', duration: 600 }} >
			<Modal open={props.open}>
				<Modal.Content image>
					<Image wrapped src={props.photoToView.picture_url} />
				</Modal.Content>
				<Button attached='bottom' color='green' type='submit' onClick={props.closePhotoModal} >Close</Button>
			</Modal>
		</TransitionablePortal>
	)
}

export default ViewPhoto;