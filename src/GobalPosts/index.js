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
			if
		})
	}
}