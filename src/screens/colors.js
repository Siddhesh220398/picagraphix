import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom'
import CountUp from 'react-countup';
import VisibilitySensor from "react-visibility-sensor";
import Slider from "react-slick";
import Productitem from "../components/Productitem";

import { useDispatch, useSelector } from "react-redux";
// images path
import donate from '../assets/images/donate-icon.png';
import product_img from '../assets/images/product-single-img.png';
import Urls from "../Config/Urls";


function SearchColors({ match }) {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [product, getProduct] = useState([]);
    const [searchtotal, getsearchtotal] = useState("");

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        // document.title = `You clicked ${count} times`;
        getproductdata();
        console.log('iddd', match);
    }, []);

    const getproductdata = async () => {

        axios.get(`${Urls.base_url}search-colors/${match.params.id}`)
            .then(async (response) => {
                const likes = response.data.data.images.data;
                // getProduct(likes);
                await getProduct(response.data.data.images.data)
                await getsearchtotal(response.data.data)
                // console.log('getsimilar data', response.data.data.images.data)
                // console.log("emp colors : ", searchtotal)

            })
            .catch(error => console.error(`Error: ${error}`));
    }

    return (
        <div className="skin-1">
            <Header />
            <section class="inner-banner-sec mb-5">
                {product ?
                    <div class="container">
                        <h1>#{searchtotal.colors}</h1>
                        <p>Colors ({searchtotal.total})</p>
                    </div>
                    : null
                }
            </section>
            <section className="similar_photos">
                <div className="container">
                    <div class="title-box">
                        <h2>Similar Photos</h2>
                        <div class="border-bottom"></div>
                    </div>
                    <div className="row no-gutters">
                        {product &&
                            product.map((item, index) => {
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
                                            isLike={userInfo ? item.likes.some((x, i) => x.user_id === userInfo.user.id) : false}
                                            updateDataAfterAction={() => getproductdata()}
                                        />
                                    </div>
                                );
                            })}
                    </div>

                    {/* {product ?
                        <div className="row">

                            {product.map((item, index) => {
                                return (
                                    <div className="col-md-4">
                                        <div class="feature">
                                            <div class="feature-img">
                                                <img src={item.preview_full_path} />
                                            </div>
                                            <div class="feature-content">
                                                <div class="feature-name">
                                                    <div class="feature_lable">
                                                        <Link to={`/Product_Details/${item.id}`}>
                                                            <h3>{item.title}</h3>
                                                        </Link>
                                                        <span> Days Ago</span>
                                                        <p>${item.price}</p>
                                                    </div>
                                                    <div class="wishlist">
                                                        <a href="/"><i class="fa fa-heart"></i></a>
                                                        <Link to={`/Product_Details/${item.id}`}><i class="fa fa-link"></i></Link>
                                                    </div>
                                                </div>
                                                <div class="auther">
                                                    <img src={item.users.avatar_full_path} alt="" />
                                                    <span>{item.users.username}</span>
                                                </div>
                                                <div class="bottom-part">
                                                    <div class="like">
                                                        <div class="download">
                                                            <i class="fa fa-download" aria-hidden="true"></i>
                                                            <span>{item.downloads.length}</span>
                                                        </div>
                                                        <div class="download">
                                                            <i class="fa fa-heart" aria-hidden="true"></i>
                                                            <span>{item.likes.length}</span>
                                                        </div>
                                                    </div>
                                                    <div class="main-btn">
                                                        <Link class="btn" to={`/Product_Details/${item.id}`}>buy now</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div> : null
                    } */}
                </div>
            </section>
            <Footer />
        </div>
    )
}
export default SearchColors;

