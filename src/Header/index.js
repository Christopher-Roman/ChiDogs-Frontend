import React from 'react';
import { Menu, Icon, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const HeaderApp = (props) => {
	return (
		<div>
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