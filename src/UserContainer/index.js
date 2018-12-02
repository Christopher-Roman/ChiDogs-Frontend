import React, { Component } from 'react';
import CreatePet from '../CreatePet';
import EditPet from '../EditPet';
import EditPost from '../EditPost';
import PetList from '../PetList';
import PostList from '../PostList';
import CreatePost from '../CreatePost';
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
				breed: '',
				owner: null,
				_id: ''
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
			showPetCreateModal: false,
			showPhotoUploadModal: false,
			showPostModal: false
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
		this.getPost().then(posts => {
			this.setState({posts: posts.data})
		}).catch((err) => {
			console.log(err);
		})
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
	addPost = async (posts, e) => {
		e.preventDefault();
		const csrfCookie = getCookie('csrftoken');

		try {
			const newPost = await fetch('http://localhost:8000/profile/posts/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(posts),
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrfCookie
				}
			})
			const newPostParsed = await newPost.json();
			this.setState({posts: [...this.state.posts, newPostParsed.data]})
		} catch(err) {
			console.error(err);
		}
	}
	openAndEditPet = (pet) => {
		this.setState({
			showPetEditModal: true,
			petToEdit: {
				...pet
			}
		})
	}
	openAndEditPost = (post) => {
		this.setState({
			showPostEditModal: true,
			postToEdit: {
				...post
			}
		})
	}
	handlePetEditChange = (e) => {
		this.setState({
			petToEdit: {
				...this.state.petToEdit,
				[e.currentTarget.name]: e.currentTarget.value
			}
		});
	}
	handlePostEditChange = (e) => {
		this.setState({
			postToEdit: {
				...this.state.postToEdit,
				[e.currentTarget.name]: e.currentTarget.value
			}
		})
	}
	closeAndEditPet = async (e) => {
		e.preventDefault();
		try {
			const csrfCookie = getCookie('csrftoken');
			const editPet = await fetch('http://localhost:8000/profile/pets/' + this.state.petToEdit.id + '/', {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify({
					first_name: this.state.petToEdit.first_name,
					middle_name: this.state.petToEdit.middle_name,
					last_name: this.state.petToEdit.last_name,
					age: parseInt(this.state.petToEdit.age),
					breed: this.state.petToEdit.breed
				}),
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrfCookie
				}
			})
			const editPetResponse = await editPet.json();
			console.log(editPetResponse);
			const newPetArrayWithEdit = this.state.pets.map((pet) => {
				if(pet.id === editPetResponse.data.id){
					pet = editPetResponse.data
				}
				return pet
			})
			this.setState({
				showPetEditModal: false,
				pets: newPetArrayWithEdit
			})
		} catch(err) {
			console.log(err);
		}
	}
	closeAndEditPost = async (e) => {
		e.preventDefault();
		try {
			const csrfCookie = getCookie('csrftoken');
			const editPost = await fetch('http://localhost:8000/profile/posts/' + this.state.postToEdit.id + '/', {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify({
					post_body: this.state.postToEdit.post_body
				}),
				headers:{
					'Content-Type': 'application/json',
					'X-CSRFToken': csrfCookie
				}
			})
			const editPostResponse = await editPost.json();
			const newPostArrayWithEdit = this.state.posts.map((post) => {
				if(post.id === editPostResponse.data.id) {
					post = editPostResponse.data
				}
				return post
			})
			this.setState({
				showPostEditModal: false,
				posts: newPostArrayWithEdit
			})
		}catch(err) {
			console.error(err)
		}
	}
	deletePet = async (id) => {
		try {
			const csrfCookie = getCookie('csrftoken');
			const deletePet = await fetch('http://localhost:8000/profile/pets/' + id, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrfCookie
				}
			})
			// const deletedPetParsed = await deletePet.json()
			this.setState({
				pets: this.state.pets.filter((pet) => pet.id !== id) 
			})
		} catch(err) {
			console.log(err);
		}
	}
	deletePost = async (id) => {
		try {
			const csrfCookie = getCookie('csrftoken');
			const deletePost = await fetch('http://localhost:8000/profile/posts/' + id, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrfCookie
				}
			})
			this.setState({
				posts: this.state.posts.filter((post) => post.id !== id)
			})
		} catch(err) {
			console.error(err)
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
				<Grid.Column>
					<CreatePet addPet={this.addPet}/>
					<CreatePost addPost={this.addPost}/>
				</Grid.Column>
				<Grid.Column>
					<PetList pets={this.state.pets} deletePet={this.deletePet} openAndEditPet={this.openAndEditPet} />
					<EditPet open={this.state.showPetEditModal} petToEdit={this.state.petToEdit} handlePetEditChange={this.handlePetEditChange} closeAndEditPet={this.closeAndEditPet} />
				</Grid.Column>
				<Grid.Column>
					<PostList posts={this.state.posts} deletePost={this.deletePost} openAndEditPost={this.openAndEditPost} />
					<EditPost open={this.state.showPostEditModal} postToEdit={this.state.postToEdit} handlePostEditChange={this.handlePostEditChange} closeAndEditPost={this.closeAndEditPost} />
				</Grid.Column>
			</Grid>
		)
	}
}

export default UserContainer;
