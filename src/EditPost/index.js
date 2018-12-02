import React from 'react';
import { Modal, Form, Header, Button, TransitionablePortal } from 'semantic-ui-react';

const EditPost = (props) => {
	return (
	<TransitionablePortal open={props.open} transition={{animation: 'fly down', duration: 600 }}>
		<Modal open={props.open}>
			<Header>Edit Post</Header>
			<Modal.Content>
				<Form onSubmit={props.closeAndEditPost}>
					<Form.TextArea type='text' name='post_body' value={props.postToEdit.post_body} onChange={props.handlePostEditChange} />
					<Button type='Submit'>Edit Post</Button>
				</Form>
			</Modal.Content>
		</Modal>
	</TransitionablePortal>
	)
}

export default EditPost;