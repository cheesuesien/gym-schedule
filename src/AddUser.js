import React from 'react';
import './AddUser.css';

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInUsername: '',
      signInEmail: '',
      signInPassword: '',
      signInIsAdmin: false
    }
  }

  onInputChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  onSubmitSignIn = () => {
    fetch('https://gym-schedule-api.herokuapp.com/adduser', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: this.state.signInUsername,
        email: this.state.signInEmail,
        password: this.state.signInPassword,
        isAdmin: this.state.signInIsAdmin
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.email){
        alert('User submitted successfully!');

        let inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
          input.value = '';
        })
        let select = document.querySelector('select');
        select.value = select.defaultValue;
      } else {
        alert("user submit failed");
      }
     

    })
    .catch(err => {console.log("user submit failed", err)});
  }

  
  render() {
    return (
		<article className="text-left container mt-3">
			<legend>Add New User</legend>
      <div className="form-group">
        <label htmlFor="exampleInputText1">Username</label>
        <input 
          name="signInUsername"
          type="text" 
          className="form-control" 
          id="exampleInputText1" 
          placeholder="Username" 
          onChange={this.onInputChange}
        />
      </div>
			<div className="form-group">
				<label htmlFor="exampleInputEmail1">Email address</label>
				<input 
          name="signInEmail"
          type="email" 
          className="form-control" 
          id="exampleInputEmail1" 
          aria-describedby="emailHelp" 
          placeholder="Enter email" 
          onChange={this.onInputChange}
        />
			</div>
			<div className="form-group">
				<label htmlFor="exampleInputPassword1">Password</label>
				<input 
          name="signInPassword"
          type="password" 
          className="form-control" 
          id="exampleInputPassword1" 
          placeholder="Password" 
          onChange={this.onInputChange}
        />
			</div>
      <div>
        <label htmlFor="inputGroupSelect01">Mode</label>
        <select className="custom-select" id="inputGroupSelect01" onChange={this.onInputChange}>
          <option defaultValue>Choose...</option>
          <option value="false">Student</option>
          <option value="true">Admin</option>
        </select>
      </div>
			<button type="submit" className="btn btn-primary" onClick={this.onSubmitSignIn}>Submit</button>
		</article>
		
		
       
    );
  }
}

export default AddUser;