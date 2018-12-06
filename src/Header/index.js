import React from 'react';
import { Menu, Icon, Divider, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const HeaderApp = (props) => {
	return (
		<div>
			<Image.Group>
				<Image src='https://i.imgur.com/ZLYExgI.png' size='small' floated='left'/>
				<Image src='data:image/jpeg;base64,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'  size='massive' rounded />
				<Image src='https://i.imgur.com/ZLYExgI.png' size='small' floated='right'/>
			</Image.Group>
			<Menu size='huge' attached='top' inverted >
				<Menu.Item>
		        <Link to="/profile"><Icon name='comment' />Posts</Link>
		        </Menu.Item>
		        <Menu.Item>
		        <Link to="/profile/pets"><Icon name='paw' />Pets</Link>
		        </Menu.Item>
		        <Menu.Item>
		        <Link to="/profile/photos"><Icon name='image' />Photos</Link>
		        </Menu.Item>
		        <Menu.Item>
		        <Link to="/profile/users"><Icon name='users' />Users</Link>
		        </Menu.Item>
				<Menu.Menu position='right'>
					<Menu.Item>
			        <Link to="/" onClick={props.handleLogout}><Icon name='log out'/>Logout</Link>
			        </Menu.Item>
			        <Menu.Item>
			        <Link to="/register">Register</Link>
			        </Menu.Item>
			        <Menu.Item>
			        <Link to="/">Login</Link>
			        </Menu.Item>
			    </Menu.Menu>
			</Menu>
			<Divider hidden />
		</div>
	)
}

export default HeaderApp;