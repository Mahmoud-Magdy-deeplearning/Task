import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Cookies from "universal-cookie";
import { Link } from 'react-router-dom';
import Axios from "axios";
import { stringify } from "querystring";

const cookies = new Cookies();

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      redirect: false,
      validated: false,
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  componentDidMount() {
    console.log("why");

    if (cookies.get("token")) {
      this.setState({
        redirect: true,
      });
    }
  }

  handleSubmit = (form) => {
    if (form.checkValidity() === false) {
      this.setValidated(true);
    } else {
      this.registerUser();
    }
  };

  async registerUser() {
    try {
      console.log(this.state);
      const response = await Axios({
        method: "POST",
        withCredentials: true ,
        url: `https://backend-oi5c.onrender.com/api/user/register/`,

        data: stringify({

          name: this.state.name,
          password: this.state.password,
          username: this.state.username,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*"

        },
      });
      if (response.status === 200) {
        this.props.history.push("/");
      } else {
        alert(
          "Something has gone wrong. Please contact admin or refresh and try again."
        );
      }
    } catch (e) {
      alert(e.message);
      return;
    }
  }

  setValidated = (value) => {
    this.setState({ validated: value });
  };

  render() {
    return (
      <Container>
        <Row className="full-height align-items-center justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card>
              <Card.Header className="text-center">Register</Card.Header>
              <Card.Body>
                <Form ref="registerForm" validated={this.state.validated}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={this.state.name}
                    onChange={(e) => this.handleChange(e)}
                    required
                  ></Form.Control>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={this.state.username}
                    onChange={(e) => this.handleChange(e)}
                    required
                  ></Form.Control>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={(e) => this.handleChange(e)}
                    required
                  ></Form.Control>
                </Form>
              </Card.Body>
              <Card.Footer>
                <Button
                  block
                  variant="primary"
                  onClick={() => {
                    this.handleSubmit(this.refs.registerForm);
                  }}
                >
                  Regisssster
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(RegisterPage);
