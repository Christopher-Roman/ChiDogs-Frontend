import React from 'react';
import UserContainer from '../UserContainer'
import { Card} from 'semantic-ui-react';

const UserInfo = (props) => {
	console.log(props);
	return (
		<div>
			<UserContainer />
			<Card>
				<Card.Content>
					<Card.Header>{props.user}</Card.Header>
				</Card.Content>
			</Card>
		</div>
	)
}

export default UserInfo;