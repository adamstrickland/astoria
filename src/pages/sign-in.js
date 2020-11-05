import React from "react"
import { withRouteData } from "react-static"
import { Link } from "@reach/router"
import axios from "axios"

export default class SignIn extends React.Component {
  signIn() {
    if (typeof document !== "undefined") {
      axios.post("http://localhost:4000/sessions", {
        email: "arthur.dent@hhgttg.com",
        password: "password",
      }).then((r) => {
        localStorage.setItem("user", JSON.stringify(r.data));
      }).then((_) => {
        document.location = "/";
      });
    }
  }

  signOut() {
    if (typeof document !== "undefined") {
      localStorage.removeItem("user");
      document.location = "/";
    }
  }

  render() {
    return (
      <div>
        <h2>Sign In</h2>
        <div>
          <label>Email</label>
          <br/>
          <input name="email"/>
          <br/>
          <br/>
          <label>Password</label>
          <br/>
          <input name="password" type="password"/>
          <br/>
          <br/>
          <button onClick={ this.signIn }>Sign In</button>
          <button onClick={ this.signOut }>Sign Out</button>
        </div>
      </div>
    );
  }
}
