import React from 'react';
import { Card, Button } from 'semantic-ui-react';

const GlobalPostList = (props) => {
	const posts = props.posts.map((post, i) => {
		return (
			<Card key={post.id}>
				<Card.Content>
					<Card.Content>{post.post_body}</Card.Content>
				</Card.Content>
			</Card>
		)
	})

	return (
		<div>
			<h3>Global Posts</h3>
			<Card.Group className='centered'>
				{posts}
			</Card.Group>
		</div>
	)
}

export default GlobalPostList;