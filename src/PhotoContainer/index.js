import React, { Component } from 'react';
import CreatePhoto from '../CreatePhoto';
import PhotoList from '../PhotoList';
import ViewPhoto from '../ViewPhoto'
import getCookie from 'js-cookie';
import { Grid, Message } from 'semantic-ui-react';


class PhotoContainer extends Component {
	constructor(){
		super();

		this.state = {
			photos: [],
			viewPhotosModal: false,
			photoToView: {
				picture_url: '',
				created_by: null,
				id: null
			},
			isLoggedIn: true
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
			if(photos.message === 'Must be logged in.') {
				this.setState.isLoggedIn = true
			} else {
				this.setState({photos: photos.data})
			}
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
	openPhotoModal = (photoFromList) => {
		this.setState({
			viewPhotosModal: true,
			photoToView: {
				...photoFromList
			}
		})
	}
	closePhotoModal = (e) => {
		this.setState({
			viewPhotosModal: false
		})
	}
	render() {
		return (
			<Grid columns={2} divided style={{ height: '100%' }} verticalAlign='top' stackable>
				<Grid.Column>
					<Message hidden={this.state.isLoggedIn} negative>
						You must be logged in to view this page.
					</Message>
				</Grid.Column>
				<Grid.Row>
					<Grid.Column>
						<CreatePhoto addPhoto={this.addPhoto} />
					</Grid.Column>
					<Grid.Column>
						<PhotoList photos={this.state.photos} openPhotoModal={this.openPhotoModal} deletePhoto={this.deletePhoto}/>
						<ViewPhoto open={this.state.viewPhotosModal} photoToView={this.state.photoToView} closePhotoModal={this.closePhotoModal} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

export default PhotoContainer;