import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Player } from 'video-react';
import CountUp from 'react-countup';
import VisibilitySensor from "react-visibility-sensor";
// import data from '../pages/data.js'



// images path
import serviceimg1 from '../assets/images/service-img1.jpg';
import serviceimg2 from '../assets/images/service-img2.png';
import serviceimg3 from '../assets/images/service-img3.jpg';
import serviceimg4 from '../assets/images/service-img4.jpg';
import auther_icon from '../assets/images/auther-icon.png';

// Feature Images
import feature_img1 from '../assets/images/feature-img1.jpg';
import feature_img2 from '../assets/images/feature-img2.jpg';
import feature_img3 from '../assets/images/feature-img3.jpg';
import feature_img4 from '../assets/images/feature-img4.jpg';
import feature_img5 from '../assets/images/feature-img5.jpg';
import feature_img6 from '../assets/images/feature-img6.jpg';

// Recent Photos
import recent_img1 from '../assets/images/recent-photos1.jpg';
import recent_img2 from '../assets/images/recent-photos2.jpg';
import recent_img3 from '../assets/images/recent-photos3.jpg';
import recent_img4 from '../assets/images/recent-photos4.jpg';
import recent_img5 from '../assets/images/recent-photos5.png';
import recent_img6 from '../assets/images/recent-photos6.jpg';
import recent_img15 from '../assets/images/recent-photos7.png';
import recent_img8 from '../assets/images/recent-photos8.png';
import recent_img9 from '../assets/images/recent-photos9.jpg';


//Top Categories
import categories_icon1 from '../assets/images/categories-icon1.png';
import categories_icon2 from '../assets/images/categories-icon2.png';
import categories_icon3 from '../assets/images/categories-icon3.png';
import categories_icon4 from '../assets/images/categories-icon4.png';
import categories_icon5 from '../assets/images/categories-icon5.png';
import categories_icon6 from '../assets/images/categories-icon6.png';
import categories_icon7 from '../assets/images/categories-icon7.png';
import categories_icon8 from '../assets/images/categories-icon8.png';
import categories_icon9 from '../assets/images/categories-icon9.png';
import categories_icon10 from '../assets/images/categories-icon10.png';
import categories_icon11 from '../assets/images/categories-icon11.png';
import categories_icon12 from '../assets/images/categories-icon12.png';



function MostDownloadillustrations() {

        return (
            <div className="skin-1">
                <Header />
                <section className="inner-banner-sec mb-5">
                    <div className="container">
                        <h1>Most Downloads illustrations</h1>
                        <p>Browse stock photos, Videos and Graphic by category</p>
                    </div>
                </section>
                <div className="recent-sec pt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="sidbar">
                                    <div className="price_list">
                                        <h2 className="sidbar-title">Price</h2>
                                        <div className="row">
                                            <select>
                                                <option>MIN</option>
                                            </select>
                                            <select>
                                                <option>MAX</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="Category_list">
                                        <h2 className="sidbar-title">Category</h2>
                                        <ul>
                                            <li>
                                                <input type="checkbox" id="Category" name="Category" />
                                                <label for="Category"> All</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" id="Category1" name="Category" />
                                                <label for="Category1"> Architecture</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" id="Category2" name="Category" />
                                                <label for="Category2"> Backgrounds / Textures</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" id="Category3" name="Category" />
                                                <label for="Category3"> Business / Finance</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" id="Category4" name="Category" />
                                                <label for="Category4"> Computer / Communication</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" id="Category6" name="Category" />
                                                <label for="Category6"> Education</label>
                                            </li><li>
                                                <input type="checkbox" id="Category7" name="Category" />
                                                <label for="Category7"> Fashion</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" id="Category8" name="Category" />
                                                <label for="Category8"> Nature / Landscapes</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" id="Category9" name="Category" />
                                                <label for="Category9"> Industry / Craft</label>
                                            </li>
                                            <li>
                                                <label className="red-color">See All</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="Category_list">
                                        <h2 className="sidbar-title">Categories</h2>
                                        <ul>
                                            <li>
                                                <input type="radio" id="Category11" name="Category" />
                                                <label for="Category11"> Premium</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="Category12" name="Category" />
                                                <label for="Category12"> Latest</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="Category13" name="Category" />
                                                <label for="Category13"> Featured</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="Category14" name="Category" />
                                                <label for="Category14"> Popular</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="Category114" name="Category" />
                                                <label for="Category114"> Most Commented</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="Category16" name="Category" />
                                                <label for="Category16"> Most Viewed</label>
                                            </li><li>
                                                <input type="radio" id="Category17" name="Category" />
                                                <label for="Category17"> Most Downloads</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="Category_list">
                                        <h2 className="sidbar-title">Conditions</h2>
                                        <ul>
                                            <li>
                                                <input type="radio" id="Category11" name="Category" />
                                                <label for="Category11"> All Time</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="Category12" name="Category" />
                                                <label for="Category12"> Today</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="Category13" name="Category" />
                                                <label for="Category13"> This Week</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="Category14" name="Category" />
                                                <label for="Category14"> This Month</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="Category114" name="Category" />
                                                <label for="Category114"> This Year</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="feature">
                                        <div className="feature-img">
                                            <img src={recent_img1} />
                                        </div>
                                        <div className="feature-content">
                                            <div className="feature-name">
                                                <div className="feature_lable">
                                                    <h3>Young businesswoman checking her tablet with Free Photo </h3>
                                                    <span>3 Days Ago</span>
                                                    <p>$20</p>
                                                </div>
                                                <div className="wishlist">
                                                    <a href=""><i class="fa fa-heart"></i></a>
                                                    <a href=""><i class="fa fa-link"></i></a>
                                                </div>
                                            </div>
                                            <div className="auther">
                                                <img src={auther_icon} alt="" />
                                                <span>James Smith</span>
                                            </div>
                                            <div className="bottom-part">
                                                <div className="like">
                                                    <div className="download">
                                                        <i class="fa fa-download" aria-hidden="true"></i>
                                                        <span>23</span>
                                                    </div>
                                                    <div className="download">
                                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                                        <span>234</span>
                                                    </div>
                                                </div>
                                                <div className="main-btn">
                                                    <a href="javascript:void(0)" className="btn">buy now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="feature-img">
                                            <img src={recent_img2} />
                                        </div>
                                        <div className="feature-content">
                                            <div className="feature-name">
                                                <div className="feature_lable">
                                                    <h3>Young businesswoman checking her tablet with Free Photo </h3>
                                                    <span>3 Days Ago</span>
                                                    <p>$20</p>
                                                </div>
                                                <div className="wishlist">
                                                    <a href=""><i class="fa fa-heart"></i></a>
                                                    <a href=""><i class="fa fa-link"></i></a>
                                                </div>
                                            </div>
                                            <div className="auther">
                                                <img src={auther_icon} alt="" />
                                                <span>James Smith</span>
                                            </div>
                                            <div className="bottom-part">
                                                <div className="like">
                                                    <div className="download">
                                                        <i class="fa fa-download" aria-hidden="true"></i>
                                                        <span>23</span>
                                                    </div>
                                                    <div className="download">
                                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                                        <span>234</span>
                                                    </div>
                                                </div>
                                                <div className="main-btn">
                                                    <a href="javascript:void(0)" className="btn">buy now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="feature-img">
                                            <img src={recent_img3} />
                                        </div>
                                        <div className="feature-content">
                                            <div className="feature-name">
                                                <div className="feature_lable">
                                                    <h3>Young businesswoman checking her tablet with Free Photo </h3>
                                                    <span>3 Days Ago</span>
                                                    <p>$20</p>
                                                </div>
                                                <div className="wishlist">
                                                    <a href=""><i class="fa fa-heart"></i></a>
                                                    <a href=""><i class="fa fa-link"></i></a>
                                                </div>
                                            </div>
                                            <div className="auther">
                                                <img src={auther_icon} alt="" />
                                                <span>James Smith</span>
                                            </div>
                                            <div className="bottom-part">
                                                <div className="like">
                                                    <div className="download">
                                                        <i class="fa fa-download" aria-hidden="true"></i>
                                                        <span>23</span>
                                                    </div>
                                                    <div className="download">
                                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                                        <span>234</span>
                                                    </div>
                                                </div>
                                                <div className="main-btn">
                                                    <a href="javascript:void(0)" className="btn">buy now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="feature-img">
                                            <img src={recent_img4} />
                                        </div>
                                        <div className="feature-content">
                                            <div className="feature-name">
                                                <div className="feature_lable">
                                                    <h3>Young businesswoman checking her tablet with Free Photo </h3>
                                                    <span>3 Days Ago</span>
                                                    <p>$20</p>
                                                </div>
                                                <div className="wishlist">
                                                    <a href=""><i class="fa fa-heart"></i></a>
                                                    <a href=""><i class="fa fa-link"></i></a>
                                                </div>
                                            </div>
                                            <div className="auther">
                                                <img src={auther_icon} alt="" />
                                                <span>James Smith</span>
                                            </div>
                                            <div className="bottom-part">
                                                <div className="like">
                                                    <div className="download">
                                                        <i class="fa fa-download" aria-hidden="true"></i>
                                                        <span>23</span>
                                                    </div>
                                                    <div className="download">
                                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                                        <span>234</span>
                                                    </div>
                                                </div>
                                                <div className="main-btn">
                                                    <a href="javascript:void(0)" className="btn">buy now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="feature-img">
                                            <img src={recent_img5} />
                                        </div>
                                        <div className="feature-content">
                                            <div className="feature-name">
                                                <div className="feature_lable">
                                                    <h3>Young businesswoman checking her tablet with Free Photo </h3>
                                                    <span>3 Days Ago</span>
                                                    <p>$20</p>
                                                </div>
                                                <div className="wishlist">
                                                    <a href=""><i class="fa fa-heart"></i></a>
                                                    <a href=""><i class="fa fa-link"></i></a>
                                                </div>
                                            </div>
                                            <div className="auther">
                                                <img src={auther_icon} alt="" />
                                                <span>James Smith</span>
                                            </div>
                                            <div className="bottom-part">
                                                <div className="like">
                                                    <div className="download">
                                                        <i class="fa fa-download" aria-hidden="true"></i>
                                                        <span>23</span>
                                                    </div>
                                                    <div className="download">
                                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                                        <span>234</span>
                                                    </div>
                                                </div>
                                                <div className="main-btn">
                                                    <a href="javascript:void(0)" className="btn">buy now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="feature-img">
                                            <img src={recent_img6} />
                                        </div>
                                        <div className="feature-content">
                                            <div className="feature-name">
                                                <div className="feature_lable">
                                                    <h3>Young businesswoman checking her tablet with Free Photo </h3>
                                                    <span>3 Days Ago</span>
                                                    <p>$20</p>
                                                </div>
                                                <div className="wishlist">
                                                    <a href=""><i class="fa fa-heart"></i></a>
                                                    <a href=""><i class="fa fa-link"></i></a>
                                                </div>
                                            </div>
                                            <div className="auther">
                                                <img src={auther_icon} alt="" />
                                                <span>James Smith</span>
                                            </div>
                                            <div className="bottom-part">
                                                <div className="like">
                                                    <div className="download">
                                                        <i class="fa fa-download" aria-hidden="true"></i>
                                                        <span>23</span>
                                                    </div>
                                                    <div className="download">
                                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                                        <span>234</span>
                                                    </div>
                                                </div>
                                                <div className="main-btn">
                                                    <a href="javascript:void(0)" className="btn">buy now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="feature-img">
                                            <img src={recent_img15} />
                                        </div>
                                        <div className="feature-content">
                                            <div className="feature-name">
                                                <div className="feature_lable">
                                                    <h3>Young businesswoman checking her tablet with Free Photo </h3>
                                                    <span>3 Days Ago</span>
                                                    <p>$20</p>
                                                </div>
                                                <div className="wishlist">
                                                    <a href=""><i class="fa fa-heart"></i></a>
                                                    <a href=""><i class="fa fa-link"></i></a>
                                                </div>
                                            </div>
                                            <div className="auther">
                                                <img src={auther_icon} alt="" />
                                                <span>James Smith</span>
                                            </div>
                                            <div className="bottom-part">
                                                <div className="like">
                                                    <div className="download">
                                                        <i class="fa fa-download" aria-hidden="true"></i>
                                                        <span>23</span>
                                                    </div>
                                                    <div className="download">
                                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                                        <span>234</span>
                                                    </div>
                                                </div>
                                                <div className="main-btn">
                                                    <a href="javascript:void(0)" className="btn">buy now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="feature-img">
                                            <img src={recent_img8} />
                                        </div>
                                        <div className="feature-content">
                                            <div className="feature-name">
                                                <div className="feature_lable">
                                                    <h3>Young businesswoman checking her tablet with Free Photo </h3>
                                                    <span>3 Days Ago</span>
                                                    <p>$20</p>
                                                </div>
                                                <div className="wishlist">
                                                    <a href=""><i class="fa fa-heart"></i></a>
                                                    <a href=""><i class="fa fa-link"></i></a>
                                                </div>
                                            </div>
                                            <div className="auther">
                                                <img src={auther_icon} alt="" />
                                                <span>James Smith</span>
                                            </div>
                                            <div className="bottom-part">
                                                <div className="like">
                                                    <div className="download">
                                                        <i class="fa fa-download" aria-hidden="true"></i>
                                                        <span>23</span>
                                                    </div>
                                                    <div className="download">
                                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                                        <span>234</span>
                                                    </div>
                                                </div>
                                                <div className="main-btn">
                                                    <a href="javascript:void(0)" className="btn">buy now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <div className="feature-img">
                                            <img src={recent_img9} />
                                        </div>
                                        <div className="feature-content">
                                            <div className="feature-name">
                                                <div className="feature_lable">
                                                    <h3>Young businesswoman checking her tablet with Free Photo </h3>
                                                    <span>3 Days Ago</span>
                                                    <p>$20</p>
                                                </div>
                                                <div className="wishlist">
                                                    <a href=""><i class="fa fa-heart"></i></a>
                                                    <a href=""><i class="fa fa-link"></i></a>
                                                </div>
                                            </div>
                                            <div className="auther">
                                                <img src={auther_icon} alt="" />
                                                <span>James Smith</span>
                                            </div>
                                            <div className="bottom-part">
                                                <div className="like">
                                                    <div className="download">
                                                        <i class="fa fa-download" aria-hidden="true"></i>
                                                        <span>23</span>
                                                    </div>
                                                    <div className="download">
                                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                                        <span>234</span>
                                                    </div>
                                                </div>
                                                <div className="main-btn">
                                                    <a href="javascript:void(0)" className="btn">buy now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <Footer />
            </div>
        )
  
}
export default MostDownloadillustrations;

