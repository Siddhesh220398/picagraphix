import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { headerApi } from "../actions/componentActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { Player } from "video-react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { homeScreenData } from "../actions/homeScreenAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from "react-slick";
// images path
import serviceimg1 from "../assets/images/service-img1.jpg";
import serviceimg2 from "../assets/images/service-img2.png";

import banner_images1 from "../assets/images/banner-images1.jpg";
import banner_images2 from "../assets/images/banner-images2.jpg";
import banner_images3 from "../assets/images/banner-images3.jpg";
import banner_images4 from "../assets/images/banner-images4.jpg";

import categories_icon1 from "../assets/images/categories-icon1.png";
import Productitem from "../components/Productitem";

function HomeScreen() {
  // const [focus, setFocus] = useState(false);
  const [_member, setMembers] = useState(0);
  const [_downloads, setDownloads] = useState(0);
  const [_stock_photo, setStockPhotos] = useState(0);
  const [_focus, setFocus] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [search_data, setSearch] = useState("");
  const [searchcategory, setSearchCatgory] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(homeScreenData());
  }, [dispatch]);
  const homeScreenAllData = useSelector((state) => state.homeData);
  const { error, loading } = homeScreenAllData;
  // const [category, setcategory] = useState([]);
  // const [featured, setfeatured] = useState([]);
  const {
    category,
    featured,
    latest,
    call_to_action,
    members,
    downloads,
    stock_photo,
    header,
    footer,
  } = homeScreenAllData.data;
  
  // setMembers(members)
  // setDownloads(downloads)
  // setStockPhotos(stock_photo)

  var settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  var settings2 = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
  };

  return (
    // console.log("homescreen loading", loading),
    <div>
      <Header item={ homeScreenAllData.data.header} />

      <div className="skin-1">
        <section className="banner-sec">
          <Slider {...settings}>
            <div>
              <div
                className="banner-bgimg"
                style={{ backgroundImage: `url(${banner_images1})` }}
              ></div>
            </div>
            <div>
              {" "}
              <div
                className="banner-bgimg"
                style={{ backgroundImage: `url(${banner_images2})` }}
              ></div>
            </div>
            <div>
              <div
                className="banner-bgimg"
                style={{ backgroundImage: `url(${banner_images3})` }}
              ></div>
            </div>
            <div>
              <div
                className="banner-bgimg"
                style={{ backgroundImage: `url(${banner_images4})` }}
              ></div>
            </div>
          </Slider>
          <div className="container">
            <div className="banner-content">
              <h1>Beautiful free & Premium stock photos</h1>
              <p>Hundreds of high resolution images added weekly.</p>
              <div className="search-box">
                <div className="input-row">
                  <input
                    onChange={(value) => setSearch(value.target.value)}
                    type="text"
                    placeholder="Royally Free Stock Photo and much more ..."
                  />
                  
                  
                  <Form.Control
                    as="select"
                    onChange={(value) => setSearchCatgory(value.target.value)}
                  >
                    <option>All images</option>
                    <option value="image">Photos</option>
                    <option value="vector">Vector</option>
                    <option value="illustration">Illustrations</option>
                  </Form.Control>
                  <div className="search-btn">
                    {/* <input title="Search" value="search" t  ype="submit" class="button" /> */}
                    <Link
                      to={`/searchdata/${search_data},${searchcategory}`}
                      className="button"
                    >
                      search
                    </Link>
                  </div>
                </div>
                {/* category below search */}
                <div className="service-list">
                  <ul>
                    <li
                      style={{
                        color: "#fd0501",
                        fontWeight: "700",
                        fontSize: "16",
                      }}
                    >
                      Trending
                    </li>
                    {category &&
                      category.map((item, index) => {
                        return index < 7 ? (
                          <li>
                            <Link to={`/category/${item.slug}`}>
                              {item.name}
                            </Link>
                          </li>
                        ) : null;
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* royalty free section  */}
        <div className="service-sec">
          <div className="container">
            <div className="title-box">
              <h2>Royalty free stock content</h2>
              <p>
                Discover royalty-free images, illustrations and videos that will
                make you stand out.
              </p>
              <div className="border-bottom"></div>
            </div>
            <div className="service">
              <div className="row justify-content-center">
                <div className="col-md-3">
                  <Link to="/pichagraphix/photo">
                    <div className="service-box">
                      <div className="service-img">
                        <img src={serviceimg1} alt="" />
                      </div>
                      <label>Images</label>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3">
                  <div className="service-box">
                    <div className="service-img">
                      <img src={serviceimg2} alt="" />
                    </div>
                    <label>vector</label>
                  </div>
                </div>
                {/* <div className="col-md-3">
                    <div className="service-box">
                      <div className="service-img">
                        <img src={serviceimg3} alt="" />
                      </div>
                      <label>illustration</label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="service-box">
                      <div className="service-img">
                        <img src={serviceimg4} alt="" />
                      </div>
                      <label>hd videos</label>
                    </div>
                  </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* featured images */}
        <div className="feature-sec pt-5">
          <div className="container">
            <div className="title-box">
              <h2>Feature Images</h2>
              <p>Royalty-free stock assets carefully selected for you</p>
              <div className="border-bottom"></div>
            </div>
            <div className="row no-gutters">
              <div className="row">
                 
              {featured &&
                featured.data.map((item, index) => {
                  return (
                    <div className="col-md-4">
                    <Productitem
                      productid={item.id}
                      pslug={item.slug}
                      bgimage={item.preview_full_path}
                      title={item.title}
                      date={item.date}
                      amount={item.price}
                      authname={item.users.username}
                      authslug={item.users.slug}
                      authimage={item.users.avatar_full_path}
                      downloads={item.downloads.length}
                      likes={item.likes}
                      item={item}
                      index={index}
                      isLike={
                        userInfo
                          ? item.likes.some(
                              (x, i) => x.user_id === userInfo.user.id
                            )
                          : false
                      }
                      updateDataAfterAction={() => dispatch(homeScreenData())}
                    />
                    </div> 
                  );
                })}
              </div>
               
                </div>
          </div>
        </div>

        {/* categories section */}
        <div className="categories-sec">
          <div className="container">
            <div className="title-box">
              <h2>Top Categories</h2>
              <p>
                Check out our popular categories, and discover more high-quality
                stock illustrations
              </p>
              <div className="border-bottom"></div>
            </div>
            <div className="row row1">
              {category &&
                category.map((item, index) => {
                  return index < 12 ? (
                    <div class="campus-col">
                    <Link to={`/category/${item.slug}`}>
                      <img src={item.images.data[0].preview_full_path} />
                      <div class="layer">
                        <h3>{item.name}</h3>
                      </div>
                    </Link>
                    </div>
                  ) : null;
                })}
            </div>
            <div class="second-btn">
              <Link to="/category">view all</Link>
            </div>
          </div>
        </div>

        {/* recent photos */}
        <div className="recent-sec pt-5">
          <div className="container">
            <div className="title-box">
              <h2>Recent Photos</h2>
              <p>
                Your idea deserves the right image. Your budget deserves a
                break.
              </p>
              <div className="border-bottom"></div>
            </div>
            {/* <Masonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}> */}
            <div className="row no-gutters">
              {latest &&
                latest.data.map((item, index) => {
                  return (
                    <div className="col-md-4">
                      <Productitem
                        productid={item.id}
                        pslug={item.slug}
                        bgimage={item.preview_full_path}
                        title={item.title}
                        date={item.date}
                        amount={item.price}
                        authname={item.users.username}
                        authslug={item.users.slug}
                        authimage={item.users.avatar_full_path}
                        downloads={item.downloads.length}
                        likes={item.likes}
                        item={item}
                        index={index}
                        isLike={
                          userInfo
                            ? item.likes.some(
                                (x, i) => x.user_id === userInfo.user.id
                              )
                            : false
                        }
                        updateDataAfterAction={() => dispatch(homeScreenData())}
                      />
                    </div>
                  );
                })}
            </div>
            {/* </Masonry> */}
          </div>
        </div>
        {/* exclusive videos */}
        {/* <div className="exclusive-videos pt-5">
            <div className="container">
              <div className="title-box">
                <h2>Exclusive Videos</h2>
                <p>
                  Your idea deserves the right images. Your budget deserves a
                  break.
                </p>
                <div className="border-bottom"></div>
              </div>
              <div className="row">
              <div className="col-md-4">
                  <div className="exclusive-box">
                    <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="exclusive-box">
                   
                    <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="exclusive-box">
                    <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        {/* number counters */}
        <div className="consumers-sec pt-5">
          <div className="container">
            <div className="title-box">
              <h2>Connect with today's consumers</h2>
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
                          console.log("visible", isVisible);
                          // if (isVisible) {
                          setFocus(isVisible);
                          // }
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

        <div className="premium-sec pt-5">
          <div className="premium-bg">
            <div className="container">
              <h3>
                Free and Premium High <br />
                Quality Photos
              </h3>
              <div class="second-btn bg">
                <a href={call_to_action && call_to_action.link} className="btn">
                  GET STARTED
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomeScreen;
