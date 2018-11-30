import React, { Component } from 'react';
import getCookie from 'js-cookie';
import { Grid } from 'semantic-ui-react';
import CreatePet from '../CreatePet';
// import CreatePost from './CreatePet';
// import CreatePhoto from './CreatePet';

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
			showPostModal: false,
		}
	}
	getPet = async () => {
		const csrfCookie = getCookie('csrftoken');
		const pets = await fetch('http://localhost:8000/profile/pets/', {
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
		const posts = await fetch('http://localhost:8000/profile/posts/', {
			'credentials': 'include',
			headers:{
				'X-CSRFToken': csrfCookie
			}
		})
		const postParsedResponse = posts.json()
		return postParsedResponse
	}
	// getPhoto = async () => {
	// 	const csrfCookie = getCookie('csrftoken');
	// 	const photos = await fetch('http://localhost:8000/profile/photos/', {
	// 		'credentials': 'include',
	// 		headers: {
	// 			'X-CSRFToken': csrfCookie
	// 		}
	// 	})
	// 	const photoParsedResponse = photos.json()
	// 	return photoParsedResponse
	// }
	componentDidMount(){
		// Mounting Pet API call
		this.getPet().then(pets => {
			this.setState({pets: pets.data})
		}).catch((err) => {
			console.log(err);
		})
		// Mounting Post API call
		// this.getPost().then(posts => {
		// 	this.setState({posts: posts.data})
		// }).catch((err) => {
		// 	console.log(err);
		// })
		// Mounting Photos API call
		// this.getPhoto().then(photos => {
		// 	this.setState({photos: photos.data})
		// }).catch((err) => {
		// 	console.log(err);
		// })
	}
	addPet = async (pet, e) => {
		e.preventDefault();
		pet.age = parseInt(pet.age)
		const csrfCookie = getCookie('csrftoken');

		try {
			const newPet = await fetch('http://localhost:8000/profile/pets/', {
		        method: 'POST',
		        credentials: 'include',
		        body: JSON.stringify(pet),
		        headers: {
		          'Content-Type': 'application/json',
		          'X-CSRFToken': csrfCookie
				}
			})
			console.log(newPet);
			const newPetParsed = await newPet.json();
			this.setState({pets: [...this.state.pets, newPetParsed.data]})
		} catch(err){
			console.log(err);
		}
	}
	addPost = async (post, e) => {
		e.preventDefault();
		const csrfCookie = getCookie('csrftoken');

		try {
			const newPost = await fetch('http://localhost:8000/profile/posts/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(post),
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrfCookie
				}
			})
			const newPostParsed = newPost.json();
			this.setState({posts: [...this.state.posts, newPostParsed]})
		} catch(err) {
			console.log(err);
		}
	}
	addPhoto = async (photo, e) => {
		e.preventDefault();
		const csrfCookie = getCookie('csrftoken');

		try {
			const newPhoto = await fetch('http://localhost:8000/profile/photos/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(photo),
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrfCookie
				}
			})
			const newPhotoParsed = newPhoto.json();
			this.setState({photos: [...this.state.photos, newPhotoParsed]})
		} catch(err) {
			console.log(err);
		}
	}
	render(){
		return(
			<Grid columns={3} divided textAlign='center' style={{ height: '100%' }} verticalAlign='top' stackable>
				<Grid.Row>
				<CreatePet addPet={this.addPet}/>
				</Grid.Row>
			</Grid>
		)
	}
}

export default UserContainer;





