import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";


import logo from '../assets/images/pichagraphix_black_logo.png'
import Background from '../assets/images/login.png'


function LoginScreen({ location, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/'
  // console.log('location', location.search, 'history', history, 'redirect', redirect)
  const userLogin = useSelector(state => state.userLogin)

  const { error, loading, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="skin-1 black-header">
      {/* <Header /> */}
      <div className="form-sec">
        <div className="row">
          <div className="col-md-6">
            <div className="bg-img" style={{ backgroundImage: "url(" + Background + ")" }}></div>
          </div>
          <div className="col-md-6">
            <div className="login-form">
              <div className="login-logo">
                <a href="/"><img src={logo} alt="" /></a>
              </div>
              <div className="login-title">
                <h2>Login Now</h2>
                <p>Free & Premium Stock Photos in one place</p>
              </div>
              <div className="form-box">
                <Form onSubmit={submitHandler}>
                  <div className="input-row">
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </div>
                  <div className="input-row">
                    <Form.Control
                      required
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </div>
                  <div className="forgot-pass">
                    <a href="/">Forgot Password?</a>
                  </div>
                  {/* <div className="input-row "> */}
                    <button type="submit" variant="primary"  className="main-btn-l btn">
                      Sign In
                  </button>
                  {/* </div> */}
                </Form>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
              </div>
              <div className="signup-sec">
                <p>Or Sign up with other account</p>
                <div className="row">
                  <div className="col-md-6">
                    <div className="fb-btn">
                      <a href="javascript:void(0)" ><i class="fab fa-facebook-f"></i> Login with Facebook</a>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="twitter-btn">
                      <a href="javascript:void(0)" ><i class="fab fa-twitter"></i> Login with Twitter</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="signup-link">
                Are you a new user? <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>Sign Up Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default LoginScreen;