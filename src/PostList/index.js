import React from 'react';
import { Card, Button } from 'semantic-ui-react';

const PostList = (props) => {
	const posts = props.posts.map((post, i) => {
		return (
			<Card key={post.id}>
				<Card.Content>
					<Card.Header>{post.post_body}</Card.Header>
				</Card.Content>
				<Card.Content extra>
					<Button onClick={props.openAndEditPost.bind(null, post)}>Edit</Button>
					<Button onClick={props.deletePost.bind(null, post.id)}>Delete</Button>
				</Card.Content>
			</Card>
		)
	})

	return (
		<div>
			<h3>Your Posts</h3>
			<Card.Group className='centered'>
				{posts}
			</Card.Group>
		</div>
	)
}

export default PostList;