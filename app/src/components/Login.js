/**
 *  
 * @author Kieran Hodgson
 * 
 * @description Login component - displays the login form
 * If the user is already logged in (checked via token being set/valid), redirect to the dashboard,
 * 
 */
import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
//import nesecary libraries and components

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectLogin, setIncorrectLogin] = useState(0);


  useEffect(
    () => {
      if (localStorage.getItem('token')) {//if token exists
        axios.post("http://unn-w20002249.newnumyspace.co.uk/emt/api/auth/validate", undefined, { //validate token API endpoint
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
          .then((response) => response.data) // get response data 
          .then((json) => { //check if response is success or not
              if (json.message === "success") {
                props.handleAuthenticated(true); //set authenticated to true
                props.navigate("/dashboard"); //redirect to dashboard
              } else {
                props.handleAuthenticated(false); //set authenticated to false
                localStorage.removeItem('token'); //remove token from local storage
              }
            })
          .catch((e) => {console.log(e.message)})
      }
    }
    , [])

  const handleUsername = (event) => { setUsername(event.target.value); } //set username state variable to value of username input

  const handlePassword = (event) => { setPassword(event.target.value); } //set password state variable to value of password input

  const handleClick = () => {
    const encodedString = Buffer.from(username + ":" + password).toString('base64'); //encode username and password

    fetch("http://unn-w20002249.newnumyspace.co.uk/emt/api/auth", //login API endpoint - sets token in local storage if successful
      {
        method: 'POST',
        headers: new Headers({ "Authorization": "Basic " + encodedString }) //send encoded username and password in auth header
      })
      .then(
        (response) => { return response.json() }) //get response data
      .then(
        (json) => {
          if (json.message === "success") {
            props.handleAuthenticated(true); //set authenticated to true
            localStorage.setItem('token', json.data.token); //set token in local storage
            setUsername(""); //reset username and password state variables
            setPassword("");
            alert("Login successful"); //alert user of successful login
            props.navigate("/dashboard"); //redirect to dashboard
          } else {
            setIncorrectLogin(incorrectLogin + 1); //increment incorrect login counter
            alert("Login failed"); //alert user of failed login
          }
        })
      .catch((e) => { console.log(e.message) } )
  }


  return (
    <div>
      {!props.authenticated && //if not authenticated display sign in
        <div>
          <h2> Sign In</h2>

          <Form.Group controlId="formBasicEmail">
            <FloatingLabel controlId="floatingInput" label="Username">
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsername} />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePassword} />
            </FloatingLabel>
          </Form.Group>
          <Button variant="primary" type="button" onClick={handleClick}> Sign In </Button>
        </div>
      }
    </div>
  )

}

export default Login;