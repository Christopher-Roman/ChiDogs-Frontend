import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './Login'
import Register from './Register';
import Header from './Header';
import UserContainer from './UserContainer';
import PetContainer from './PetContainer';
import PhotoContainer from './PhotoContainer';
import getCookie from 'js-cookie';


const My404 = () => {
  return (
    <div>
      Page not found.
    </div>
  )
}

class App extends Component {
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
  componentDidMount(){
    this.getToken();
  }
  render() {
    return (
      <div className="App">
        <Header handleLogout={this.handleLogout}/>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/profile" component={UserContainer}/>
          <Route exact path="/profile/pets" component={PetContainer}/>
          <Route exact path="/profile/photos" component={PhotoContainer}/>
          <Route component={My404}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
