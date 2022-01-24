import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom'
import CountUp from 'react-countup';
import VisibilitySensor from "react-visibility-sensor";
import Slider from "react-slick";

import Urls from "../Config/Urls";

// images path
import donate from '../assets/images/donate-icon.png';
import product_img from '../assets/images/product-single-img.png';


function SearchData({ match }) {

    const [product, getProduct] = useState([]);
    const [search_Data, getsearch_Data] = useState("");



    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        // document.title = `You clicked ${count} times`;
        getsearchdata();
        console.log('iddd', match);
    }, []);

    const getsearchdata = async () => {

        var data = match.params.id.split(",")
        console.log("data: ", data)

        const formData = new FormData()
        formData.append("search", data[0])
        formData.append("type", data[1])

        axios.post(`${Urls.base_url}search-data/`, formData)
            .then(async (response) => {
                // const likes = response.data.data.images.data;
                // getProduct(likes);
                await getProduct(response.data.data.data)
                await getsearch_Data(response.data)
                // console.log('getsimi lar data', response.data)
                // console.log("emp colors : ", product)

            })
            .catch(error => console.error(`Error: ${error}`));
    }

    return (
        <div className="skin-1">
            <Header />
            <section class="inner-banner-sec mb-5">
                {search_Data ?
                    <div class="container">
                        <h1>{search_Data.title}</h1>
                        <p>Total Search Result ( {search_Data.total} )</p>
                    </div>
                    : null
                }
            </section>
            <section className="similar_photos">
                <div className="container">
                    {/* <div class="title-box">
                        <h2>Similar Photos</h2>
                        <div class="border-bottom"></div>
                    </div> */}
                    {product ?
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
                                                        <Link to={{ pathname: `/image-photo/${item.pslug}`, state: item.productid ,slug:item.pslug}}>
                                                            <h3>{item.title}</h3>
                                                        </Link>
                                                        <span> Days Ago</span>
                                                        <p>${item.price}</p>
                                                    </div>
                                                    <div class="wishlist">
                                                        <a href="/"><i class="fa fa-heart"></i></a>
                                                        <a href="/image-photo/"><i class="fa fa-link"></i></a>
                                                    </div>
                                                </div>
                                                {/* <div class="auther">
                                                    <img src={item.users.avatar_full_path} alt="" />
                                                    <span>{item.users.username}</span>
                                                </div> */}
                                                {/* <div class="bottom-part">
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
                                                        <a class="btn" href="/Product_Details/undefined">buy now</a>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div> : null
                    }
                </div>
            </section>
            <Footer />
        </div>
    )
}
export default SearchData;

