import React, { Component, useState , useEffect} from "react";
import Form from "react-bootstrap/Form";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { homeScreenData } from "../actions/homeScreenAction";

// images path
import serviceimg1 from "../assets/images/client-slider1.png";
// import serviceimg2 from '../assets/images/client-slider2.png';
import serviceimg3 from "../assets/images/client-slider3.png";
import serviceimg4 from "../assets/images/client-slider4.png";
import serviceimg5 from "../assets/images/client-slider5.png";
import serviceimg6 from "../assets/images/client-slider6.png";

import aboutimg from "../assets/images/about-us.jpg";

function About() {
  window.scrollTo(0, 0);
  const [_focus, setFocus] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(homeScreenData());
  }, [dispatch]);
  const homeScreenAllData = useSelector((state) => state.homeData);
  const { error, loading } = homeScreenAllData;
  // const [category, setcategory] = useState([]);
  // const [featured, setfeatured] = useState([]);
  const {
    members,
    downloads,
    stock_photo,
  } = homeScreenAllData.data;
  const settings = {
    dots: false,
    slidesToShow: 6,
    slidesToScroll: 6,
  };
  return (
    <div className="skin-1">
      <Header />
      <section className="inner-banner-sec">
        <div className="container">
          <h1>About us</h1>
          <p>We love helping you bring ideas to life.</p>
        </div>
      </section>
      <section className="about-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="about-conetent">
                <h2>
                  The origins of our <span>Pichagraphix </span>Universe
                </h2>
                <p>
                  Our first project, Pichagraphix, was founded in 2010 by
                  brothers Alejandro and Pablo Blanes, along with their friend
                  Joaquín Cuenca, founder of Panoramio (acquired by Google).
                </p>
                <p>
                  Alejandro felt the urge to create a platform where designers
                  could find free graphic resources. Pablo and Joaquín supported
                  his idea and that’s how Pichagraphix Company was created.
                </p>
                <p>
                  Since then, our Universe has been expanding non-stop, creating
                  two new projects.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="about-img">
                <img src={aboutimg} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="client-logo-slider">
        <div className="container">
          <Slider {...settings}>
            <div>
              <img src={serviceimg1} alt="" />
            </div>
            <div>
              <img src={serviceimg3} alt="" />
            </div>
            <div>
              <img src={serviceimg3} alt="" />
            </div>
            <div>
              <img src={serviceimg4} alt="" />
            </div>
            <div>
              <img src={serviceimg5} alt="" />
            </div>
            <div>
              <img src={serviceimg6} alt="" />
            </div>
          </Slider>
        </div>
      </section>
      <div className="consumers-sec pt-5">
        <div className="container">
          <div className="title-box">
            <h2>Connect with Us</h2>
            <p>
              Finding the right visuals to use during this pandemic can be a
              challenge.
            </p>
            <div className="border-bottom"></div>
          </div>
          <div className="row">
            <div className="connect-box">
              <CountUp
                start={_focus ? 0 : null}
                end={members}
                duration={5}
                redraw={true}
              >
                {({ countUpRef }) => (
                  <div>
                    <span ref={countUpRef} />
                    <VisibilitySensor
                      onChange={(isVisible) => {
                        if (isVisible) {
                          setFocus(true);
                        }
                      }}
                    >
                      <a>+</a>
                    </VisibilitySensor>
                  </div>
                )}
              </CountUp>
              <p>MEMBERS</p>
            </div>
            <div className="connect-box">
              <CountUp
                start={_focus ? 0 : null}
                end={downloads}
                duration={5}
                redraw={true}
              >
                {({ countUpRef }) => (
                  <div>
                    <span ref={countUpRef} />
                    <VisibilitySensor
                      onChange={(isVisible) => {
                        if (isVisible) {
                          setFocus(true);
                        }
                      }}
                    >
                      <a>+</a>
                    </VisibilitySensor>
                  </div>
                )}
              </CountUp>
              <p>DOWNLOADS</p>
            </div>
            <div className="connect-box">
              <CountUp
                start={_focus ? 0 : null}
                end={stock_photo}
                duration={5}
                redraw={true}
              >
                {({ countUpRef }) => (
                  <div>
                    <span ref={countUpRef} />
                    <VisibilitySensor
                      onChange={(isVisible) => {
                        if (isVisible) {
                          setFocus(true);
                        }
                      }}
                    >
                      <a>+</a>
                    </VisibilitySensor>
                  </div>
                )}
              </CountUp>
              <p>STOCK PHOTOS</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default About;
