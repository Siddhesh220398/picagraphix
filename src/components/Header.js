import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Container, Nav, Row, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import { logout } from "../actions/userActions";
import "../assets/fonts/stylesheet.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import "../App.css";
// import 'video-react/dist/video-react.css';
// import logo from "../assets/images/logo.png";
import logo from "../assets/images/pichagraphix_white_logo.png"
import axios from "axios";
import Urls from "../Config/Urls";

const Header = (props) => {
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const homeScreenAllData = useSelector((state) => state.homeData);
  const { error, loading } = homeScreenAllData;
  // const [category, setcategory] = useState([]);
  // const [featured, setfeatured] = useState([]);
  const { category } = homeScreenAllData.data;

  // console.log('homeScreenAllData.data',homeScreenAllData.data)
  const [pages, setPages] = useState([]);
  const [header, setheader] = useState([]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/')
  };
  var balancedata = localStorage.getItem("balance");
  var fundsdata = localStorage.getItem("funds");

  useEffect(() => {
    getAllPages()
    getHomeHeader()
  }, [])



  const getAllPages = async () => {
    await axios.get(Urls.base_url + "all-pages")
      .then(res => {
        console.log(res.data)
        if (res.data.success) {
          setPages(res.data.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  const getHomeHeader = async () => {
    await axios.get(Urls.base_url + "get-home")
      .then(res => {
        console.log(res.data)
        if (res.data.success) {
          setheader(res.data.header)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
// console.log('props',header)
  return (
    <header class="site-header mo-left header">
      <div className="container">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <NavLink exact activeClassName="active" to="/">
            <img src={header?header.logo2:logo} alt="" className="img-fluid" />{" "}
          </NavLink>

          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <i class="fas fa-bars"></i>
            <i class="fas fa-times"></i>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            {/* <Nav className="mr-auto">
                        <Nav.Link activeClassName="active" to="#features">Photos</Nav.Link>
                        <Nav.Link activeClassName="active" to="/">Videos</Nav.Link>
                        </Nav> */}
            <Nav>
              <NavLink activeClassName="active"  className="mLink" to="/pichagraphix/photo">
                Photos
              </NavLink>
              {/* <NavLink activeClassName="active" to="/pichagraphix/vector">
                Vector
              </NavLink> */}

              {/* <NavLink activeClassName="active" to="/">Pricing</NavLink> */}
              {/* <NavLink activeClassName="active" to="/about">
                About
              </NavLink> */}
              {/* {pages && pages.map((item, index) => {
                if (item.slug === "about-us") {
                  return (
                    <NavLink activeClassName="active" className="mLink"  to={{ pathname: `/${item.slug}`, state: item }}>
                      {item.title}
                    </NavLink>
                  )
                }
              })} */}
              <NavLink activeClassName="active"   className="mLink" to={{ pathname: `/about-us` }}>
                About Us
              </NavLink>
              <NavLink activeClassName="active"   className="mLink" to="/contact">
                Contact
              </NavLink>
             
              <NavDropdown title="Explore" id="username">
                <LinkContainer to="/Members">
                  <NavDropdown.Item>
                    <i class="fas fa-user-friends"></i> Members
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/Collections">
                  <NavDropdown.Item>
                    <i class="far fa-folder-open"></i> Collections
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/pichagraphix/tag">
                  <NavDropdown.Item>
                    <i class="fas fa-tags"></i> Tags
                  </NavDropdown.Item>
                </LinkContainer>
                <div className="border"></div>
                <LinkContainer to="/pichagraphix/featured">
                  <NavDropdown.Item>Featured</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/pichagraphix/popular">
                  <NavDropdown.Item>Popular</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/pichagraphix/latest">
                  <NavDropdown.Item>Latest</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/pichagraphix/most/commented">
                  <NavDropdown.Item>Most Commented</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/pichagraphix/most/viewed">
                  <NavDropdown.Item>Most Viewed</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/pichagraphix/most/download">
                  <NavDropdown.Item>Most Downloads</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              
              {userInfo ? (
                // profile & Logout
                <NavDropdown title={userInfo.user.username} id="username">
                  <NavDropdown.Item className="not-link">
                    <i class="fas fa-dollar-sign"></i> Balance{" "}
                    <span>${balancedata}</span>
                  </NavDropdown.Item>
                  <NavDropdown.Item className="not-link">
                    <i class="far fa-money-bill-alt"></i> Funds{" "}
                    <span>${fundsdata}</span>
                  </NavDropdown.Item>
                  <div className="border"></div>
                  <LinkContainer to={{ pathname: `/profile/${ userInfo.user.username }` ,state: userInfo.user.id }} >
                    <NavDropdown.Item>
                      <i class="fas fa-tachometer-alt"></i> Dashboard
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/Funds">
                    <NavDropdown.Item>
                      <i class="far fa-money-bill-alt"></i> Add Funds
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/Balance">
                    <NavDropdown.Item>
                      <i class="fas fa-hand-holding-usd"></i> Withdraw Balance
                    </NavDropdown.Item>
                  </LinkContainer>
                  <div className="border"></div>

                  <LinkContainer to={{ pathname: `/profile/${ userInfo.user.username }`, state: userInfo.user.id }} >
                    <NavDropdown.Item>
                      <i class="far fa-user"></i> Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/Collections">
                    <NavDropdown.Item>
                      <i class="far fa-folder-open"></i> Collections
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/likes">
                    <NavDropdown.Item>
                      <i class="far fa-heart"></i> Likes
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/account">
                    <NavDropdown.Item>
                      <i class="fas fa-users-cog"></i> Account Settings
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i class="fas fa-sign-out-alt"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavLink activeClassName="active" to="/login" className="btn">
                  GET STARTED
                </NavLink>
              )}

              {userInfo ? (
                <NavLink activeClassName="active" to="/upload" className="btn">
                  <i class="fas fa-cloud-upload-alt"></i> Upload
                </NavLink>
              ) : (
                <NavLink activeClassName="active" to="/login" className="btn">
                  <i class="fas fa-cloud-upload-alt"></i> Upload
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
    // <header>
    //   <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
    //     <Container>
    //       <LinkContainer to="/">
    //         <Navbar.Brand>React Header</Navbar.Brand>
    //       </LinkContainer>
    //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //       <Navbar.Collapse id="basic-navbar-nav">
    //         <Nav className="mr-auto">
    // {userInfo ? (
    //   // profile & Logout
    //   <NavDropdown title={userInfo.user.username} id="username">
    //     <LinkContainer to="/profile">
    //       <NavDropdown.Item>Profile</NavDropdown.Item>
    //     </LinkContainer>

    //     <NavDropdown.Item onClick={logoutHandler}>
    //       Logout
    //     </NavDropdown.Item>
    //   </NavDropdown>
    // ) : (
    // login
    //             <LinkContainer to="/login">
    //               <Nav.Link>
    //                 <i className="fas fa-user"></i>Login
    //               </Nav.Link>
    //             </LinkContainer>
    //           )}
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
    // </header>
  );
}

export default Header;
