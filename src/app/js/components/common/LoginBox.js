import React, { Component, PropTypes } from 'react';
export default class LoginBox extends Component {
  render() {
    return(
      <div>
        <h2>Select your associated account</h2>
        <a key="Login" href="/api/user/login/oauth2?accountType=FACEBOOK" target="_blank">Facebook</a>
        <a key="Login" href="/api/user/login/oauth2?accountType=LINKEDIN" target="_blank">Linkedin</a>
        <a key="Login" href="/api/user/login/oauth2?accountType=GOOGLE" target="_blank">Google</a>
    </div>
    )
  }
}
