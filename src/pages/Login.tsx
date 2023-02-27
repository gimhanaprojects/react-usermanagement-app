import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AppUser } from "../constants";
import { useAuth } from "../hooks/useAuth";
import AuthService from "../service/AuthService";

const Login = () => {
  const AUTH = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState({ username: "", password: "" });
  const usernameChangeHandler = (value: string) => {
    setState((ps) => ({ ...ps, username: value }));
  };

  const passwordChangeHandler = (value: string) => {
    setState((ps) => ({ ...ps, password: value }));
  };
  const loginHandler = async () => {
    const creds = { username: state.username, password: state.password };

    try {
      const response = await AUTH.login(creds);

      console.log("DATA ", response.data);
      console.log("HEADER ");

      const token = response.headers["jwt-token"];
      const user: AppUser = { ...response.data, token: token };

      AUTH.setAppUser(user);
      AuthService.setUpAxiosInterceptors(user);
      navigate("/auth/dashboard", { replace: true });
    } catch (e) {
      console.log("ERROR");
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="offset-md-3">
          <h2 className="text-center text-dark mt-5">Sign In</h2>

          <div className="card my-5">
            <form
              className="card-body cardbody-color p-lg-5"
              onSubmit={(e) => {
                loginHandler();
                e.preventDefault();
              }}
            >
              <div className="text-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3242/3242257.png"
                  className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px"
                  alt="profile"
                />
              </div>

              <div className="mb-2 mt-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="User Name"
                  value={state.username}
                  onChange={(e) => {
                    usernameChangeHandler(e.target.value);
                  }}
                />
              </div>
              <span style={{ color: "red" }}>Please enter a User Name</span>
              <div className="mb-2 mt-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={(e) => {
                    passwordChangeHandler(e.target.value);
                  }}
                />
              </div>
              <span style={{ color: "red" }}>Please enter password</span>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn px-5 mb-3 w-100 btn-primary mt-4"
                >
                  <i className="fas fa-spinner fa-spin mr-2"></i>Login
                </button>
              </div>
              <div
                id="emailHelp"
                className="form-text text-center mb-5 text-dark"
              >
                Not Registered?
                <Link to="/register" className="text-dark fw-bold">
                  Create an Account
                </Link>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
