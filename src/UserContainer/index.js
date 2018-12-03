import React, { Component } from 'react';
import EditPost from '../EditPost';
import PostList from '../PostList';
import CreatePost from '../CreatePost';
import getCookie from 'js-cookie';
import { Grid } from 'semantic-ui-react';

class UserContainer extends Component {
	constructor(){
		super();

		this.state = {
			posts: [],
			photos: [],
			postToEdit: {
				post_body: ''
			},
			replyToEdit: {
				reply_body: ''
			},
			showPostEditModal: false,
			showReplyEditModal: false,
			showPhotoUploadModal: false,
			showPostModal: false
		}
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
	componentDidMount(){
		// Mounting Post API call
		this.getPost().then(posts => {
			this.setState({posts: posts.data})
		}).catch((err) => {
			console.log(err);
		})
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
	openAndEditPost = (post) => {
		this.setState({
			showPostEditModal: true,
			postToEdit: {
				...post
			}
		})
	}
	handlePostEditChange = (e) => {
		this.setState({
			postToEdit: {
				...this.state.postToEdit,
				[e.currentTarget.name]: e.currentTarget.value
			}
		})
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
			<Grid columns={2} divided textAlign='center' style={{ height: '100%' }} verticalAlign='top' stackable>
				<Grid.Column>
				</Grid.Column>
				<Grid.Column>
					<CreatePost addPost={this.addPost}/>
					<PostList posts={this.state.posts} deletePost={this.deletePost} openAndEditPost={this.openAndEditPost} />
					<EditPost open={this.state.showPostEditModal} postToEdit={this.state.postToEdit} handlePostEditChange={this.handlePostEditChange} closeAndEditPost={this.closeAndEditPost} />
				</Grid.Column>
			</Grid>
		)
	}
}

export default UserContainer;
