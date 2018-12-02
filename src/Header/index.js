import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const HeaderApp = (props) => {
	return (
		<Menu attached='top' tabular>
			<Menu.Item>
	        <Link to="/profile">Profile</Link>
	        </Menu.Item>
	        <Menu.Item>
	        <Link to="/profile/pets">Pets</Link>
	        </Menu.Item>
	        <Menu.Item>
	        <Link to="/profile/photos">Photos</Link>
	        </Menu.Item>
	        <Menu.Item>
	        <Link to="/profile">Search</Link>
	        </Menu.Item>
			<Menu.Menu position='right'>
				<Menu.Item>
				<Link to="/">Login</Link>
				</Menu.Item>
				<Menu.Item>
		        <Link to="/" onClick={props.handleLogout}>Logout</Link>
		        </Menu.Item>
		        <Menu.Item>
		        <Link to="/register">Register</Link>
		        </Menu.Item>
		    </Menu.Menu>
		</Menu>
	)
}

export default HeaderApp;