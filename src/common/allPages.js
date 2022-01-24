import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import CountUp from "react-countup";

import VisibilitySensor from "react-visibility-sensor";
import Slider from "react-slick";
import Footer from "../components/Footer";
import { useParams, useHistory } from "react-router-dom";
import Urls from "../Config/Urls";
  // images path
  import serviceimg1 from "../assets/images/client-slider1.png";
  // import serviceimg2 from '../assets/images/client-slider2.png';
  import serviceimg3 from "../assets/images/client-slider3.png";
  import serviceimg4 from "../assets/images/client-slider4.png";
  import serviceimg5 from "../assets/images/client-slider5.png";
  import serviceimg6 from "../assets/images/client-slider6.png";
  
import { useDispatch, useSelector } from "react-redux";
import { homeScreenData } from "../actions/homeScreenAction";

const AllPages = (props) => {
  const { page } = useParams();
  const [content, setcontent] = useState("");
  const [pages, setPages] = useState();
  const myRef = React.createRef();

  const [_focus, setFocus] = useState(false);

  useEffect(async () => {
    const { state } = await props.location;
    setcontent(state);
    getpage(page);
    window.scrollTo(0, 0);
  }, [props.location, page]);
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
  const getpage = async (page) => {
    await axios
      .get(`${Urls.base_url}all-pages/${page}`)
      .then(async (response) => {
     
        await setPages(response.data.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  const settings = {
    dots: false,
    slidesToShow: 6,
    slidesToScroll: 6,
  };
//   console.log('pages',pages)
  return (
    <div className="skin-1" ref={myRef}>
      <Header />
      {pages ? (
        <section className="inner-banner-sec">
          <div className="container">
            <h1>{pages.title}</h1>
            {/* <p>We love helping you bring ideas to life.</p> */}
          </div>
        </section>
      ) : (
        <section className="inner-banner-sec page-not">
          <div className="container">
            <h1>Page Not Found</h1>
            <p>Why don't you try one of these pages instead?</p>
            <div className="button-page">
              <div class="second-btn bg">
                <a class="btn" href="/">
                  Home
                </a>
              </div>
              <div class="second-btn bg">
                <a class="btn" href="/contact">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
      {pages ? (
        <section className="about-section">
          <div className="container">
            <div dangerouslySetInnerHTML={{ __html: pages.content }} />
          </div>
        </section>
      ) : null}
      {pages && (pages.slug == "about-us")? (
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
      ) : null}

      {pages && (pages.slug == "about-us")?  (
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
      ) : null}
      <Footer />
    </div>
  );
};

export default AllPages;
