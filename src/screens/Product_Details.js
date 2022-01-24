import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Header from "../components/Header-black";
import Footer from "../components/Footer";
import { Link, useHistory, useParams } from "react-router-dom";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import Notification from "../components/notification";

import Slider from "react-slick";
import Productitem from "../components/Productitem";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
// images path

import OrderStripCheckout from "../components/OrderStripCheckout";
import DonateStripCheckout from "../components/DonateStripCheckout";
import { DonatePaypal } from "../components/DonatePaypal";
import { OrderPaypal } from "../components/OrderPaypal";
import logo from "../assets/images/dark-logo.png";
import donate from "../assets/images/donate-icon.png";
import product_img from "../assets/images/product-single-img.png";
import Urls from "../Config/Urls";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function ProductDetails(props) {
  window.scrollTo(0, 0);
  const {id}= useParams()
  console.log(id)
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let history = useHistory();
  var bgColors = {
    pink: "#e8d1c3",
    green: "#275a3d",
    gold: "#e37e01",
    light_blue: "#0e9fdf",
    light_sky: "#c1dcd9",
    light_skys: "#dae8f0",
    light_pink: "#fee7c9",
  };
  const redirect = (item) => {
    history.push(`/colors/${item}`);
  };
  const [product, getProduct] = useState("");
  const [buyProduct, setBuyproduct] = useState("");
  const [visits, getvisits] = useState([]);
  const [similar, getsimilar] = useState([]);
  const [colors, getColors] = useState();
  const [sorders, getOrders] = useState([]);
  const [discription, setdiscription] = useState("");
  const [sizeType, setSizeType] = useState("");
  const [sizeItem, setSizeItem] = useState("");
  const [tagsType, settagsType] = useState();
  const [productid, setProductId] = useState();
  const [donate_item, setDonate_item] = React.useState("");
  const [paymentTyped, setPaymentTyped] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("");
  const [modalIsOpenBuyNow, setIsOpenBuynow] = React.useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [downloadButton, setDownloadButton] = React.useState(false);
  const [modalIsOpendonate, setIsOpendonate] = React.useState(false);
  const DATE_OPTIONS = { year: "numeric", month: "short", day: "numeric" };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
    const { state } = props.location;
    setProductId(state);
    // console.log('state',state)
    getproductdata(id);
    // console.log('iddd', props.match);
  }, [props.location]);

  const getproductdata = async (slug) => {

    const id = userInfo ? userInfo.user.slug : 0;
    const { state } = props.location;
    // console.log('s',userInfo.user)
    axios
    .get(`${Urls.base_url}content-detail-slug/${slug}/${id}`)
    .then(async (response) => {
      const likes = response.data.response;
      console.log('pstat',response.data.response)

        // console.log('"getsimilar', response.data.response.stock[0]);
        setSizeItem(response.data.response.stock[0]);
        // getProduct(likes);
        await getProduct(response.data.response);
        await getvisits(response.data.response.visits);
        await getsimilar(response.data.similar_images);
        // console.log('getsimilar data', response.data.similar_images)

        var tempColors = response.data.response.colors.split(",");
        var temptags = response.data.response.tags.split(",");
        getColors(tempColors);
        getOrders(response.data.response.user_purchase);
        if (response.data.response.user_purchase.length > 0) {
          const data1 = response.data.response.user_purchase.filter(function (
            item
          ) {
            return item.type == "small";
          });
          if (data1.length > 0) {
            setDownloadButton(true);
          } else {
            setDownloadButton(false);
            console.log("sb");
          }
        }

        settagsType(temptags);
        setdiscription(response.data.response.stock[0].resolution);
        // console.log("emp colors : ", tempColors)
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const like_unlike = async () => {
    const formData = new FormData();
    formData.append("user_id", userInfo.user.id);
    formData.append("images_id", product.id);

    // console.log("user id : ", userInfo.user.id, " image id : ", product.id);
    await axios
      .post(Urls.base_url + "image-like-unlike", formData)
      .then((res) => {
        console.log('sp',res.data);
        if (res.data.success === 1) {
          getproductdata(id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function openModalddonate() {
    setIsOpendonate(true);
  }
  function afterOpenModal() {}
  function closeModaldonate() {
    setIsOpendonate(false);
    window.location.reload(false);
  }

  function handleItemDownload(ite) {
    if (sorders.length > 0) {
      // console.log('sorders',sorders)
      const data = sorders.filter(function (item) {
        return item.type == ite.type;
      });
      if (data.length > 0) {
        setDownloadButton(true);
      } else {
        setDownloadButton(false);
        console.log("sb");
      }
    } else {
      setDownloadButton(false);

      console.log("sss");
    }
  }

  function closeModal() {
    setIsOpen(false);

    window.location.reload(false);
  }

  console.log('product',product);

  return product ? (
    <div className="skin-1">
      <div className="dark-menu">
        <Header />
      </div>
      <section className="product-single">
        {product ? (
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="product-left-block">
                  <div className="published">
                    Published on{" "}
                    <span className="red-color">{new Date(product.date
                                        ).toLocaleDateString(
                                          "en-US",
                                          DATE_OPTIONS
                                        )}</span>
                  </div>
                  <div className="title">{product.title}</div>
                  <div className="social-box">
                    <div className="auther-box">
                      <div className="auther-icon">
                        <img src={product.users.avatar_full_path} alt="" />
                      </div>
                      <div className="auther-name">
                        <span className="red-color">By</span>{" "}
                        {product.users.username}
                      </div>
                      <div className="profile-title">
                        <ul>
                          <li>
                            {userInfo ? (
                              <button
                                className="btn-donate"
                                onClick={userInfo ? openModalddonate : null}
                              >
                                <img src={donate} alt="" />
                              </button>
                            ) : (
                              <Link className="btn-donate" to={"/login"}>
                                <img src={donate} alt="" />
                              </Link>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="social">
                      <ul>
                        <li>
                          <a href="javascript:void(0)">
                            <i class="fab fa-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">
                            <i class="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">
                            <i class="fab fa-youtube"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="product-left-block">
                  <div className="product-single-img">
                    <img
                      src={product.preview_full_path}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="infoxbox_bottom">
                    <ul>
                      <li>
                      {userInfo?
                        <span
                          onClick={() => (userInfo ? like_unlike() : null)}
                          
                          className={
                            userInfo &&
                            product.likes.some(
                              (x, i) => x.user_id === userInfo.user.id
                            )
                              ? "wishlist-like"
                              : "unwishlists"
                          }
                        >
                          <i class="fa fa-heart" aria-hidden="true"></i>
                        </span>
                        :
                        <Link to={"/login"} style={{color:'#9094af'}} className={
                            userInfo &&
                            product.likes.some(
                              (x, i) => x.user_id === userInfo.user.id
                            )
                              ? "wishlist-like"
                              : "unwishlists"
                          }> <i class="fa fa-heart" aria-hidden="true"></i></Link>
                          }
                        <span>{product.likes.length} LIKES</span>
                      </li>
                      <li>
                        <span>
                          <i class="fa fa-download" aria-hidden="true"></i>
                        </span>
                        <span>PREVIEW</span>
                      </li>
                      <li>
                        <span>
                          <i class="fa fa-eye" aria-hidden="true"></i>
                        </span>
                        <span>{product.visits.length} VIEW</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="product-right-block">
                  <div className="size-box">
                    <h2>Download File</h2>
                    <ul>
                      {product.stock.map((item, index) => {
                        {
                          /* console.log('items',item) */
                        }
                        {
                          /* console.log(item) */
                        }
                        return (
                          <li>
                            <input
                              defaultChecked={index === 0}
                              type="radio"
                              name="size"
                              defaultValue={item}
                              onClick={() => {
                                setdiscription(item.resolution);
                                setSizeType(item.type);
                                setSizeItem(item);
                                handleItemDownload(item);
                              }}
                            />
                            <label>{item.type_display}</label>
                          </li>
                        );
                      })}
                    </ul>
                    <span>Resolution {discription}</span>
                  </div>
                  <div className="price">
                    <span>Price : </span>
                    <h2>
                      $
                      {sizeType === "medium"
                        ? product.price * 2
                        : sizeType === "large"
                        ? product.price * 4
                        : product.price}
                    </h2>
                  </div>
                  {/* <div className="green-btn"> */}
                  {userInfo ? (
                    downloadButton == true ? (
                      <a
                        className="green-btn"
                        href={product.preview_full_path}
                        download
                      >
                        Download Now
                      </a>
                    ) : (
                      <button
                        className="green-btn"
                        onClick={() => {
                          sizeItem != ""
                            ? setIsOpenBuynow(true)
                            : Notification("error", "Error!", "Select Size!");
                        }}
                      >
                        Buy Now
                      </button>
                    )
                  ) : (
                    <button className="green-btn">Buy Now</button>
                  )}
                  {/* <a href="javascript:void(0)">Buy Now</a> */}
                  {/* </div> */}
                  <div className="color-box">
                    <h2>COLOR PALLETE</h2>
                    <ul>
                      {colors &&
                        colors.map((item, index) => {
                          return (
                            <li>
                              <input
                                type="radio"
                                name="color"
                                onClick={() => redirect(item)}
                              />
                              <label
                                style={{ backgroundColor: "#" + item }}
                              ></label>
                              <span>#{item}</span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <ul className="license-info">
                    <li>
                      Includes our{" "}
                      <span className="red-color"><b>  Standard License.</b></span>
                    </li>
                    <li>
                      Add an{" "}
                      <span className="red-color"><b> Extended License.</b></span>
                    </li>
                  </ul>
                  <ul className="img-info">
                    <li>
                      Stock photo ID : <span>1150096021</span>
                    </li>
                    <li>
                      Upload date : <span>{product.date}</span>
                    </li>
                    <li>
                      Categories : <span>{product.category.name}</span>
                    </li>
                    <li>
                      Resolution : <span>{discription}</span>
                    </li>
                    <li>
                      Photo type : <span>{product.extension}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="key-word">
              <h2>Related Keywords</h2>
              <ul>
                {tagsType &&
                  tagsType.map((item, index) => {
                    return <li>{item}</li>;
                  })}
              </ul>
            </div>
          </div>
        ) : null}
      </section>
      <section className="similar_photos">
        <div className="container">
          <div class="title-box">
            <h2>Similar Photos</h2>
            <div class="border-bottom"></div>
          </div>
          <div className="row no-gutters">
            {similar &&
              similar.map((item, index) => {
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
                      updateDataAfterAction={() => getproductdata(id)}
                    />
                  </div>
                );
              })}
          </div>
          {/* {similar ?
                        <div className="row">

                            {similar.map((item, index) => {
                                return (
                                    <div className="col-md-4">
                                        <div class="feature">
                                            <div class="feature-img">
                                                <img src={item.preview_full_path} />
                                            </div>
                                            <div class="feature-content">
                                                <div class="feature-name">
                                                    <div class="feature_lable">
                                                        <a href={`/Product_Details/${item.id}`}>
                                                            <h3>{item.title}</h3>
                                                        </a>
                                                        <span> Days Ago</span>
                                                        <p>${item.price}</p>
                                                    </div>
                                                    <div class="wishlist">
                                                        <a href="/"><i class="fa fa-heart"></i></a>
                                                        <a href={`/Product_Details/${item.id}`}><i class="fa fa-link"></i></a>
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
                                                        <a class="btn" href={`/Product_Details/${item.id}`}>buy now</a>
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
      <Modal
        isOpen={modalIsOpendonate}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModaldonate}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-header">
          <div className="modal-title">
            <img src={logo} alt="Logo" />
          </div>
          <button onClick={closeModaldonate}>
            <i class="fas fa-times-circle"></i>
          </button>
        </div>
        <div>
          <div className="input-boxes">
            <div className="input-box">
              <i class="fas fa-dollar-sign"></i>
              <input
                type="text"
                placeholder="Amount"
                value={donate_item}
                onChange={(e) => setDonate_item(e.target.value)}
              />
            </div>
            <div className="input-box-new">
              <div>
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentTyped === "paypal"}
                  onChange={(event) => setPaymentTyped(event.target.value)}
                />
                <label for="paypal">Paypal</label>
              </div>
              <div>
                <input
                  type="radio"
                  value="stripe"
                  checked={paymentTyped === "stripe"}
                  onChange={(event) => setPaymentTyped(event.target.value)}
                />
                <label for="stripe">Stripe</label>
              </div>
            </div>
          </div>
          <div>
            {paymentTyped === "stripe" ? (
              donate_item != "" ? (
                <DonateStripCheckout
                  user_id={userInfo.user.id}
                  item={donate_item}
                />
              ) : (
                Notification("error", "Error!", "Please enter Amount!")
              )
            ) : paymentTyped === "paypal" ? (
              donate_item != "" ? (
                <DonatePaypal
                  user_id={userInfo.user.id}
                  item={donate_item}
                  closeModel={() => {
                    setIsOpendonate(false);
                    setDonate_item("");

                    // getDonateList(userInfo.user.id);
                  }}
                />
              ) : (
                Notification("error", "Error!", "Please enter Amount!")
              )
            ) : null}
            {/* <div class="second-btn">
                <Link onClick={handleSubmissionnew}>Update Profile</Link>
              </div> */}
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpenBuyNow}
        // isOpen={true}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-header">
          <div className="modal-title">
            <img src={logo} alt="Logo" />
          </div>
          <button onClick={() => setIsOpenBuynow(false)}>
            <i class="fas fa-times-circle"></i>
          </button>
        </div>
        <div className="input-boxes">
          <div className="input-box-new">
            <div>
              <input
                type="radio"
                id="Category102"
                name="Category"
                value="paypal"
                checked={paymentType === "paypal"}
                onChange={(event) => setPaymentType(event.target.value)}
              />
              <label for="paypal">Paypal</label>
            </div>
            <div>
              <input
                type="radio"
                id="Category101"
                name="Category"
                value="stripe"
                checked={paymentType === "stripe"}
                onChange={(event) => setPaymentType(event.target.value)}
              />
              <label for="stripe">Stripe</label>
            </div>
          </div>
        </div>

        {paymentType === "stripe" ? (
          <OrderStripCheckout
            user_id={userInfo.user.id}
            item={sizeItem}
            price={product.price}
          />
        ) : paymentType === "paypal" ? (
          <OrderPaypal
            user_id={userInfo.user.id}
            item={sizeItem}
            price={product.price}
            closeModel={() => {
              setIsOpenBuynow(false);
            }}
          />
        ) : null}

        {/* <div className="input-row main-btn button-design">
            <Link onClick={() => console.log(paymentType)} >Submit</Link>
          </div> */}
      </Modal>
      <Footer />
    </div>
  ) : (
    <div className="skin-1">
      <Header />
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
      <Footer />
    </div>
  );
}
export default ProductDetails;
