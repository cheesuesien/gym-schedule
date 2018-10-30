import React from 'react';
import './Signin.css';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  //TODO: Try [name] : value
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
	  
    fetch('https://gym-schedule-api.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.email) {
          this.props.loadUser(user);
          this.props.signIn(this.props.isSignedIn);
          if (user.admin) {
            this.props.adminSignIn(this.props.isAdmin);
          }
        }
      })
  }

  
  render() {
    return (
		<article className="container mt-3">
			<legend>Sign In</legend>
			<div className="form-group">
				<label htmlFor="exampleInputEmail1">Email address</label>
				<input 
          type="email" 
          className="form-control" 
          id="exampleInputEmail1" 
          aria-describedby="emailHelp" 
          placeholder="Enter email" 
          onChange={this.onEmailChange}
        />
			</div>
			<div className="form-group">
				<label htmlFor="exampleInputPassword1">Password</label>
				<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.onPasswordChange}/>
			</div>
			<button type="submit" className="btn btn-primary" onClick={this.onSubmitSignIn}>Submit</button>
		</article>
		
		
       
    );
  }
}

export default Signin;