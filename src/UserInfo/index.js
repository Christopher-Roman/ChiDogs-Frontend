import React, { Component } from 'react';
import UserList from '../UserList'
import getCookie from 'js-cookie';
import apiUrl from '../apiURL.js'

class UserInfo extends Component {
	constructor(){
		super();

		this.state = {
			pets: [],
			showUserViewModal: false,
			isLoggedIn: false
		}
	}
	getPets = async () => {
		const csrfCookie = getCookie('csrftoken');
		const pets = await fetch(HOST + '/users/user/', {
			credentials: 'include',
			headers: {
				'X-CSRFToken': csrfCookie
			}
		});
		const usersParsedJSON = await pets.json();
		return usersParsedJSON
	}
	componentDidMount(){
		// Mounting Pet API call
		this.getPets().then(pets => {
			if(pets.message === 'Must be logged in.') {
				this.setState.isLoggedIn = true
			} else {
				this.setState({pets: pets.data})
			}
		}).catch((err) => {
			console.log(err);
		})
	}
	render() {
		return (
			<UserList pets={this.state.pets} /> 
		)
	}
}

export default UserInfo;