import React, { Component } from 'react';
import apiUrl from '../apiURL.js';
import getCookie from 'js-cookie';


class GlobalPost extends Component {
	constructor() {
		super();

		this.state = {
			posts: []
		}
	}
	getPosts = async () => {
		const csrfCookie = getCookie('csrftoken')
		const posts = await fetch(apiUrl + '/users/posts/', {
			credentials: 'include',
			headers: {
				'X-CSRFToken': csrfCookie
			}
		});
		parsedPostResponse = await posts.json();
		return parsedPostResponse;
	}
	componentDidMount() {
		this.getPosts().then((posts) => {
			if(posts.message === 'Must be logged in'){
				render(){
					return (
						<h1>You must be logged in to view this page.</h1>
					)
				}
			} else {
				this.setState({posts: posts.data})
			}
		}).catch((err) => {
			console.log(err);
		})
	}
}