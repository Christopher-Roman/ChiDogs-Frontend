import React, { Component } from 'react';
import CreatePhoto from '../CreatePhoto';
import PhotoList from '../PhotoList';
import getCookie from 'js-cookie';
import { Grid } from 'semantic-ui-react';

class PhotoContainer extends Component {
	constructor(){
		super();

		this.state = {
			photos: [],
		}
	}
	getPhotos = async () => {
		const csrfCookie = getCookie('csrftoken');
		const photos = await fetch('http://localhost:8000/profile/photos', {
			'credentials': 'include',
			headers: {
				'X-CSRFToken': csrfCookie
			}
		})
		const photosParsedResponse = photos.json();
		return photosParsedResponse
	}
	componentDidMount() {
		this.getPhotos().then(photos => {
			this.setState({photos: photos.data})
		}).catch((err) => {
			console.log(err);
		})
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
			const newPhotoParsed = await newPhoto.json();
			
			this.setState({photos: [...this.state.photos, newPhotoParsed.data]})
		} catch(err) {
			console.error(err)
		}
	}
	deletePhoto = async (id) => {
		try {
			const csrfCookie = getCookie('csrftoken');
			const deletePhoto = await fetch('http://localhost:8000/profile/photos/' + id, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrfCookie
				}
			})
			this.setState({
				photos: this.state.photos.filter((photo) => photo.id !== id)
			})
		} catch(err) {
			console.error(err)
		}
	}
	render() {
		return (
			<Grid columns={2} divided style={{ height: '100%' }} verticalAlign='top' stackable>
				<Grid.Row>
					<Grid.Column>
						<CreatePhoto addPhoto={this.addPhoto} />
					</Grid.Column>
					<Grid.Column>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

export default PhotoContainer;