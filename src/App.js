import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './Login'
import Register from './Register';
import Header from './Header';
import PetContainer from './PetContainer';
import PhotoContainer from './PhotoContainer';
import UserContainer from './UserContainer';
import UserInfo from './UserInfo'
import getCookie from 'js-cookie';


import { apiUrl } from './apiURL.js'

if(Object.keys(process.env).findIndex(key=>key=='REACT_APP_LOCAL_VERSION')){
  import { HOST } from '../Secrets/secrets.js'
} 

const My404 = () => {
  return (
    <div>
      Page not found.
    </div>
  )
}

class App extends Component {
  constructor() {
    super()
    this.state = {
        username: '',
        password: '',
        isValid: true
    }
  }
  // componentDidMount(){
  //   this.getToken();
  // }
  handleLogout = async (e) => {
    e.preventDefault();
    try {
      const cookie = getCookie('csrftoken');
      const logoutRequest = await fetch(HOST + '/users/logout/', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': cookie
        }
      })

      const logoutRequestParsed = await logoutRequest.json();

      if (logoutRequestParsed.data === 'Logout Successful') {
        console.log(`Logout Successful`);
        this.props.history.push('/')                            // Redirect to Login
      
      } else {
        console.log(`logoutRequestParsed.error: `, logoutRequestParsed.error);
      }

    } catch(err){
      console.error(`Error catch in handleLogout: `, err);
    }
  }
  getToken = async () => {
    const token = await fetch(HOST + '/users/getToken', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const tokenParsed = token.json();
    return tokenParsed;
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const csrfCookie = getCookie('csrftoken')
    const loginResponse = await fetch(HOST + '/users/login/', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.state),
      headers: {
        'X-CSRFToken': csrfCookie,
        'Content-Type': 'application/json'
      }
    })
    const parsedResponse = await loginResponse.json();
    if(parsedResponse.data === 'Login Successful') {
      this.props.history.push('/profile')
    } else {
      this.isValid = false
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  render() {
    return (
      <div className="App">
        <Header handleLogout={this.handleLogout} username={this.state.username} />
        <Switch>
          <Route exact path="/" render={(props) => <Login {...props} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />} />
          <Route exact path="/register" component={Register}/>
          <Route exact path="/profile" component={UserContainer} />
          <Route exact path="/profile/pets" component={PetContainer}/>
          <Route exact path="/profile/photos" component={PhotoContainer}/>
          <Route exact path="/profile/users" component={UserInfo} />
          <Route component={My404}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
