import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Register from './Register';
import Header from './Header';
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
        // this.props.history.push('/')                            // Redirect to Login
      
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
        <Register />
      </div>
    );
  }
}

export default App;
