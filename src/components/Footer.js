
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Urls from "../Config/Urls";
import axios from "axios";
// import logo from '../assets/images/f-logo.png';
import logo from "../assets/images/pichagraphix_black_logo.png"
import { Container, Row, Col } from "react-bootstrap";
import { homeScreenData } from "../actions/homeScreenAction";
import { useDispatch, useSelector } from "react-redux";

function FooterPage() {
  const [footerdata, setfooter] = useState('');
  const [pages, setPages] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(homeScreenData());
  }, [dispatch]);
  const homeScreenAllData = useSelector((state) => state.homeData);
  const { error, loading } = homeScreenAllData;

  const {
    category,
    featured,
    latest,
    call_to_action,
    members,
    downloads,
    stock_photo,
  } = homeScreenAllData.data;


  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(homeScreenData());
  // }, [dispatch]);
  // const homeScreenAllData = useSelector((state) => state.homeData);
  // const {
  //   footer,
  // } = homeScreenAllData.data;
  // console.log("footer: ", JSON.parse(footer));

  useEffect(() => {
    getAllPages()
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


  return (
    <footer class="site-footer style1">
      <div className="container">
        <div className="row">
          <div className="f-logo-column">
            <div className="logo-sec">
              <img src={logo} alt="" />
            </div>
            <div className="f-content">
              {/* <p>{footer.description}</p> */}
              <p>Pichagraphix offers the highest quality royalty free stock images, photos, vector, illustrations, videos and music for almost any use.</p>
            </div>
            <div className="demo-wrapper">
              {/* <LanguageSwitcher supportLanguages={[Languages.EN, Languages.ZH_CN]}/> */}
            </div>
          </div>
          <div className="f-menu-column">
            <div className="title">
              <h3>About</h3>
            </div>
            <ul>
              {pages && pages.map((item, index) => {
                return (
                  <li><Link to={{ pathname: `/${item.slug}`, state: item }}>{item.title}</Link></li>
                )
              })}

              {/* <li><Link to="/">Help</Link></li> */}
              {/* <li><Link to="/">Terms</Link></li> */}
              {/* <li><Link to="/">Privacy</Link></li> */}
              <li><Link to="/">Advertise</Link></li>
              {/* <li><Link to="/about">About</Link></li> */}
              <li><Link to="/">Support</Link></li>
              <li><Link to="/">License</Link></li>
            </ul>
          </div>
          <div className="f-menu-column">
            <div className="title">
              <h3>Categories</h3>
            </div>
            <ul>
              {category &&
                category.map((item, index) => {
                  return index < 8 ? (
                    <li><Link to={`/category/${item.slug}`}>{item.name}</Link></li>
                  ) : null
                })}
              {/* <li><Link to="/">Architecture</Link></li>
              <li><Link to="/">Backgrounds / Textures</Link></li>
              <li><Link to="/">Business / Finance</Link></li>
              <li><Link to="/">Computer </Link></li>
              <li><Link to="/">Communication</Link></li>
              <li><Link to="/">Education</Link></li>
              <li><Link to="/">Fashion</Link></li> */}
            </ul>
          </div>
          <div className="f-menu-column">
            <div className="title">
              <h3>Links</h3>
            </div>
            <ul>
              <li><Link to={`/login`}>Login</Link></li>
              <li><Link to={`/register`}>Sign up</Link></li>
             
            </ul>
          </div>
          <div className="f-menu-column">
            <div className="title">
              <h3>connect us</h3>
            </div>
            <ul>
              <li><Link to="/"><i class="fab fa-facebook-f"></i></Link></li>
              <li><Link to="/"><i class="fab fa-twitter"></i></Link></li>
              <li><Link to="/"><i class="fab fa-youtube"></i></Link></li>
            </ul>
          </div>
        </div>
        </div>
        <div className="container copyRightRow">
        <div className="row mt-2 ">
          <div className="col-md-12 col-sm-12 col-lg-12">
            <div className="copyRight">
              <h3>&copy; <span> GoStock </span> | Free and Premium Stock Photos -2022</h3>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterPage;