import React from 'react';
import { Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const HeaderApp = (props) => {
	return (
		<Header>
			<ul>
				<li><a href='#'>Login</a></li>
				<li><a href='#' onClick={props.handleLogout}>Logout</a></li>
				<li><a href='/Register'>Register</a></li>
				<li><a href='#'>Profile</a></li>
			</ul>
		</Header>
	)
}

export default HeaderApp;