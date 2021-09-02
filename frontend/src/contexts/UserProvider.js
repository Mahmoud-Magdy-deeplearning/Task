import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

import UserContext from "./UserContext";
import { stringify } from "querystring";

const cookies = new Cookies();

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,

      name: null,
    };
  }

  componentDidMount() {
    if (cookies.get("token") !== null) {
      axios({
        method: "GET",
        url: "http://localhost:5000/api/user/",
        headers: {
          "X-ACCESS-TOKEN": cookies.get("token"),
        },
        withCredentials: true,
      })
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              isLoggedIn: true,
              name: response.data.result,
            });
          } else {
            alert(response.data.message);
            this.props.history.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          isLoggedIn: this.state.isLoggedIn,
          name: this.state.name,
          handleLogin: (data) => {
            axios({
              method: "POST",
              url: "http://localhost:5000/api/user/login",
              data: stringify(data),
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            })
              .then((response) => {
                if (response.status === 200) {
                  this.setState(
                    {
                      isLoggedIn: true,
                    },
                    () => {
                      this.props.history.push("/dashboard");
                    }
                  );
                } else {
                  alert(response.data.message);
                }
              })
              .catch((error) => {
                // return;
                alert(error.data && error.data.message);
              });
          },
          handleLogout: (data) => {
            cookies.remove("token");
            this.props.history.push("/");
          },
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default withRouter(UserProvider);
