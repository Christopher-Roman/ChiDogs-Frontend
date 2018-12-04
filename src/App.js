import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './Login'
import Register from './Register';
import Header from './Header';
import PetContainer from './PetContainer';
import PhotoContainer from './PhotoContainer';
import UserInfo from './UserInfo';
import getCookie from 'js-cookie';


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
      loginInfo: {
        username: '',
        password: ''
      },
      user: {
        username: '',
        user_image: ''
      },
      isValid: true
    }
  }
  componentDidMount(){
    this.getToken();
  }
  handleLogout = async (e) => {
    e.preventDefault();
    try {
      const cookie = getCookie('csrftoken');
      const logoutRequest = await fetch('http://localhost:8000/users/logout/', {
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
    const token = await fetch('http://localhost:8000/users/getToken', {
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
    const loginResponse = await fetch('http://localhost:8000/users/login/', {
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
        <Header handleLogout={this.handleLogout} />
        <Switch>
          <Route exact path="/" render={(props) => <Login {...props} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />} />
          <Route exact path="/register" component={Register}/>
          <Route exact path="/profile" render={(props) => <UserInfo {...props} user={this.state.user.username}/>} />
          <Route exact path="/profile/pets" component={PetContainer}/>
          <Route exact path="/profile/photos" component={PhotoContainer}/>
          <Route component={My404}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
