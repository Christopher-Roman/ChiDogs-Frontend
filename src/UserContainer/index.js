import React, { Component } from 'react';
import getCookie from 'js-cookie';
import { Grid } from 'semantic-ui-react';

class UserContainer extends Component {
	constructor(){
		super();

		this.state = {
			pets: [],
			posts: [],
			photos: [],
			petToEdit: {
				first_name: '',
				middle_name: '',
				last_name: '',
				age: null,
				breed: ''
			},
			postToEdit: {
				post_body: ''
			},
			replyToEdit: {
				reply_body: ''
			},
			showPetEditModal: false,
			showPostEditModal: false,
			showReplyEditModal: false,
			showPhotoUploadModal: false,
			showCommentModal: false,
		}
	}
	getPet = async () => {
		const csrfCookie = getCookie('csrftoken');
		const pets = await fetch('http://localhost:8000/pets/', {
			'credentials': 'include',
			headers: {
				'X-CSRFToken': csrfCookie
			}
		});
		const petsParsedResponse = pets.json()
		return petsParsedResponse
	}
	getPost = async () => {
		const csrfCookie = getCookie('csrftoken');
		const posts = await fetch('http://localhost:8000/posts/', {
			'credentials': 'include',
			headers:{
				'X-CSRFToken': csrfCookie
			}
		})
		const postParsedResponse = posts.json()
		return postParsedResponse
	}
	getPhoto = async () => {
		const csrfCookie = getCookie('csrftoken');
		const photos = await fetch('http://localhost:8000/photos/', {
			'credentials': 'include',
			headers: {
				'X-CSRFToken': csrfCookie
			}
		})
		const photoParsedResponse = photos.json()
		return photoParsedResponse
	}
	componentDidMount(){
		// Mounting Pet API call
		this.getPet().then(pets => {
			this.setState({pets: pets.data})
		}).catch((err) => {
			console.log(err);
		})
		// Mounting Post API call
		this.getPost().then(posts => {
			this.setState({posts: posts.data})
		}).catch((err) => {
			console.log(err);
		})
		// Mounting Photos API call
		this.getPhoto().then(photos => {
			this.setState({photos: photos.data})
		}).catch((err) => {
			console.log(err);
		})
	}
}