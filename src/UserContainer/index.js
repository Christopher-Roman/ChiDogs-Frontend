import React, { Component } from 'react';
import EditPost from '../EditPost';
import PostList from '../PostList';
import CreatePost from '../CreatePost';
import GlobalPostList from '../GlobalPostList';
import getCookie from 'js-cookie';
import { Grid, Message } from 'semantic-ui-react';
import apiUrl from '../apiURL.js'

class UserContainer extends Component {
	constructor(){
		super();

		this.state = {
			posts: [],
			globalPosts: [],
			postToEdit: {
				post_body: '',
				created_by_id: ''
			},
			replyToEdit: {
				reply_body: ''
			},
			showPostEditModal: false,
			showPostModal: false,
			isLoggedIn: true
		}
	}
	getPost = async () => {
		const csrfCookie = getCookie('csrftoken');
		const posts = await fetch(apiUrl + '/profile/posts/', {
			'credentials': 'include',
			headers:{
				'X-CSRFToken': csrfCookie
			}
		})
		const postParsedResponse = posts.json()
		return postParsedResponse
	}
	getGlobalPosts = async () => {
		const csrfCookie = getCookie('csrftoken')
		const globalPosts = await fetch(apiUrl + '/users/post', {
			credentials: 'include',
			headers: {
				'X-CSRFToken': csrfCookie
			}
		});
		const parsedGlobalPostResponse = await globalPosts.json();
		console.log(parsedGlobalPostResponse);
		return parsedGlobalPostResponse;
	}
	componentDidMount(){
		// Mounting Post API call
		this.getPost().then(posts => {
			if(posts.message === 'Must be logged in.') {
				this.setState.isLoggedIn = true
			} else {
				this.setState({posts: posts.data})
			}
		}).catch((err) => {
			console.log(err);
		})
		this.getGlobalPosts().then((posts) => {
			if(posts.message === 'Must be logged in'){
				console.log('You must be logged in');
			} else {
				this.setState({globalPosts: posts.data})
			}
		}).catch((err) => {
			console.log(err);
		})
	}
	addPost = async (posts, e) => {
		e.preventDefault();
		const csrfCookie = getCookie('csrftoken');

		try {
			const newPost = await fetch(apiUrl + '/profile/posts/', {
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
			const editPost = await fetch(apiUrl + '/profile/posts/' + this.state.postToEdit.id + '/', {
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
			const deletePost = await fetch(apiUrl + '/profile/posts/' + id, {
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
	render(){
		return(
			<Grid columns={1} divided >
				<Grid.Column>
					<Message hidden={this.state.isLoggedIn} negative>
						You must be logged in to view this page.
					</Message>
				</Grid.Column>
				<Grid.Row>
					<Grid.Column width={8}>
						<CreatePost addPost={this.addPost}/>
						<PostList posts={this.state.posts} deletePost={this.deletePost} openAndEditPost={this.openAndEditPost} />
						<EditPost open={this.state.showPostEditModal} postToEdit={this.state.postToEdit} handlePostEditChange={this.handlePostEditChange} closeAndEditPost={this.closeAndEditPost} />
					</Grid.Column>
					<Grid.Column width={8}>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

export default UserContainer;
