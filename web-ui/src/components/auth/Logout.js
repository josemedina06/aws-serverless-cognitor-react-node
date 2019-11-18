import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedOut: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    
  }
  async signOut() {
    try {
      const user = await Auth.signOut();
      console.log(user);
      window.location.assign("/");
    } catch (error) {
      console.log(error);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.signOut();
    this.setState({
      signedOut: true
    });
    e.target.reset();
  }


  render() {
    const { signedOut } = this.state;
    if (signedOut) {
      return (
        <div>
          <h1>You have signed Out!</h1>
        </div>
      );
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <button>Logout</button>
          </form>
        </div>
      );
    }
  }
}

export default Logout;
