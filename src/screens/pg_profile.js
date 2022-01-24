import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header-black";
import Footer from "../components/Footer";
import { Link, useHistory, useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Line, Bar } from "react-chartjs-2";
import Urls from "../Config/Urls";

import { homeScreenData } from "../actions/homeScreenAction";
import Notification from "../components/notification";
import Modal from "react-modal";
// Import React FilePond
import Productitem from "../components/Productitem";
// images path
import donate_icon from "../assets/images/donate-icon.png";
import logo from "../assets/images/pichagraphix_black_logo.png";


import StripCheckout from "../components/StripCheckout";
import DonateStripCheckout from "../components/DonateStripCheckout";
import { DonatePaypal } from "../components/DonatePaypal";
import { Paypal } from "../components/Paypal";


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
const PGprofiles = (props) => {
  const {id} = useParams();
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(homeScreenData());
  }, [dispatch]);
  const DATE_OPTIONS = { year: "numeric", month: "short", day: "numeric" };

  const [product, getProduct] = useState("");
  const [followers, getfollowers] = useState([]);
  const [following, getfollowing] = useState([]);
  const [downloads, getdownloads] = useState([]);
  const [collections, getcollections] = useState([]);
  const [producttag, settag] = useState([]);
  

  const [selectedFile, setSelectedFile] = useState();
  const [selectedFilename, setSelectedFilename] = useState();
  const [isSelected, setIsFilePicked] = useState(false);

  const [selectedFilecover, setSelectedFilecover] = useState();
  const [selectedFilecovername, setSelectedFilecovername] = useState();
  const [isSelectedcover, setIsFilePickedcover] = useState(false);

  const [images, getimages] = useState([]);
  const [subscription, getsubscription] = useState([]);
  const [donates, getdonates] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const [userid, setuserid] = useState("");
  const [photoid, setphotoid] = useState("");
  const { error, loading, userInfo } = userLogin;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpenC, setIsOpenC] = React.useState(false);
  const [modalIsOpenprofile, setIsOpenprofile] = React.useState(false);
  const [modalIsOpendonate, setIsOpendonate] = React.useState(false);
  const [modalIsOpeneditprofile, setIsOpeneditprofile] = React.useState(false);
  const [modalIsOpenBuyNow, setIsOpenBuynow] = React.useState(false);
  const [paymentType, setPaymentType] = React.useState("");
  const [paymentTyped, setPaymentTyped] = React.useState("");
  const [subscription_item, setSubscription_item] = React.useState("");
  const [donate_item, setDonate_item] = React.useState("");
  const [isActive, setActive] = React.useState(false);
  const [other_user_id, setOther_user_id] = React.useState(false);

  const [website, setWebsite] = React.useState((userInfo)?userInfo.user.website: "");
  const [facebook, setFacebook] = React.useState((userInfo)?userInfo.user.facebook: "");
  const [instagram, setInstagram] = React.useState((userInfo)?userInfo.user.instagram: "");
  const [donateAmount, setDonateAmount] = React.useState("");
  const [twitter, setTwitter] = React.useState((userInfo)?userInfo.user.twitter: "");
  const [bio, setBio] = React.useState((userInfo)?userInfo.user.bio: "");
  const [country, setCountry] = React.useState((userInfo)?userInfo.user.countries_id: "");


  function openModal() {
    setIsOpen(true);
  }
  function openModalS() {
    setIsOpenC(true);
  }
  function openModals() {
    setIsOpeneditprofile(true);
  }
  function openModalddonate() {
    setIsOpendonate(true);
  }
  function openModalprofile() {
    setIsOpenprofile(true);
  }
  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
    setIsOpenprofile(false);
    setSelectedFilecover("");
    window.location.reload(false);
  }
  function closeModalS() {
    setIsOpenC(false);
   
  }
  function afterOpenModal() {}

  function closeModalss() {
    window.location.reload(false);
  }
  function closeModaldonate() {
    setIsOpendonate(false);
    window.location.reload(false);
  }
  useEffect(async () => {
    const { state } = await props.location;

    if (state === undefined || state === null) {
      
      // if (userInfo) {
      //   var id = userInfo.user.id;
      //   console.log("---", userInfo);
      //   await setuserid(userInfo.user.id);
      //   await getmyprofile(id);
      //   await gettag();
      //   await getSubscriptionList(id);
      //   // await getDonateList(id);
      // }else{
      //   console.log('user_state',state)
      // }
    } else {
      console.log('user_state',state)
      await setOther_user_id(state);
      await gettag();
      await getSubscriptionList(state);
      
    }
    await getmyprofile(id);
  }, [props.location,id]);
 
         
  const getmyprofile = async (id) => {
    console.log('s',id)
    await axios
      .get(`${Urls.base_url}my-profile-slug/${id}`)
      .then(async (response) => {
        console.log('profile',response.data.data)
        await getProduct(response.data.data);
        await getfollowers(response.data.data.followers.data);
        await getfollowing(response.data.data.following.data);
        await getdownloads(response.data.data.downloads);
        await getcollections(response.data.data.collections);
        await getimages(response.data.data.images);
        localStorage.setItem(
          "balance",
          JSON.stringify(response.data.data.balance)
        );
        localStorage.setItem("funds", JSON.stringify(response.data.data.funds));
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const updatemyprofile = async (id) => {
    console.log("id", id);
    await axios
      .post(`${Urls.base_url}account`, id)
      .then(async (response) => {
        
        Notification("success", response.data.message);
        setIsOpeneditprofile(false);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getSubscriptionList = async (id) => {
   
    const formData = new FormData();
    formData.append("user_id", id);
    await axios
      .post(`${Urls.base_url}get-subscription`, formData)
      .then(async (response) => {
       
        if (response.data.success) {
          var data = response.data.data;
          await getsubscription(response.data.data);
          var isActive = await data.some((i) => i.is_active === 1);
         
          await setActive(isActive);
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setSelectedFilename(event.target.files[0].name);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    getprofilephoto(selectedFile);
  };
  const handleSubmissionnew = () => {
    const params = {
      website: website,
      facebook: facebook,
      instagram: instagram,
      twitter: twitter,
      user_id: userInfo.user.id,
      full_name: userInfo.user.username,
      username: userInfo.user.username,
      countries_id: userInfo.user.countries_id,
      author_exclusive: userInfo.user.author_exclusive,
      paypal_account: userInfo.user.paypal_account,
      email: userInfo.user.email,
      bio: bio,
    };
    updatemyprofile(params);
  };

  const getprofilephoto = async (selectedFile) => {
    const formData = new FormData();
    formData.append("user_id", userid);
    formData.append("photo", selectedFile);

    axios
      .post(`${Urls.base_url}upload/avatar/`, formData)
      .then(async (response) => {
        console.log("profile img", response.data);
        // console.log("emp colors : ", product)
        if (response.data.success) {
          Notification(
            "success",
            "Success!",
            "profile images upload successfully"
          );
          window.location.reload(false);
          return;
        } else {
          Notification("error", "Error!", "please select a valid image file");
          return;
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const changeHandlercover = (event) => {
    setSelectedFilecover(event.target.files[0]);
    setSelectedFilecovername(event.target.files[0].name);
    setIsFilePickedcover(true);
  };

  const handleSubmissioncover = () => {
    getcoverphoto(selectedFilecover);
  };

  const getcoverphoto = async (selectedFilecover) => {
    const formData = new FormData();
    formData.append("user_id", userid);
    formData.append("photo", selectedFilecover);

    axios
      .post(`${Urls.base_url}upload/cover/`, formData)
      .then(async (response) => {
        console.log("getcoverphoto img", response.data);
        
        if (response.data.success) {
          Notification(
            "success",
            "Success!",
            "Cover images upload successfully"
          );
          setIsOpen(false);
          window.location.reload(false);
          return;
        } else {
          Notification("error", "Error!", "please select a valid Cover file");
          Notification("error", "Error!", `${response.data.errors.photo[1]}`);
          return;
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const gettag = async () => {
    await axios
      .get(`${Urls.base_url}tag/`)
      .then(async (response) => {
        await settag(response.data.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const featuredImage = async (value, image_id) => {
    const formData = new FormData();
    formData.append("user_id", userInfo.user.id);
    formData.append("image_id", image_id);
    formData.append("is_featured", value);

    await axios
      .post(Urls.base_url + "change-user-image-featured", formData)
      .then((res) => {
      
        if (res.data.success) {
          getmyprofile(userInfo.user.id);
          Notification("success", "Success!", res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const follow_user = async (id, other) => {

    await axios
      .get(`${Urls.base_url}follow/${userInfo.user.id}/${id}`)
      .then((res) => {
       
        if (res.data.status) {
          if (other === "other") getmyprofile(id);
          else getmyprofile(userInfo.user.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    {/* {props.location.state != undefined ? */}
      <div className="skin-1">
        <div className="dark-menu">
          <Header />
        </div>

        <div className="container pt-5 mt-5">
          <div className="profile-banner">
          {userInfo ? userInfo.user.id === other_user_id ?
            <button onClick={openModal}>
              <i class="fas fa-pencil-alt"></i>
            </button>
          : null: null }
            <img src={product.cover_full_path} alt="" className="img-fluid" />
          </div>
          <div className="profile-row">
            <div className="profile-box">
              <div className="porfile-img">
              {userInfo ? userInfo.user.id === other_user_id ?
                <button onClick={openModalprofile}>
                  <i class="fas fa-pencil-alt"></i>
                </button>
               :null : null}
                <img src={product.avatar_full_path} alt="" />
              </div>

              <div className="porfile-content">
                <div className="profile-title">
                  <h2>{product.username}</h2>
                  {userInfo? userInfo.user.id === other_user_id ? (
                    <button className="btn-editprofile" onClick={openModals}>
                      <i class="fas fa-pencil-alt"></i>
                    </button>
                  ) : null: null }
                  
                  
                  {userInfo ? (
                              <button
                                className="btn-donate"
                                onClick={userInfo ? openModalddonate : null}
                              >
                                <img src={donate_icon} alt="" />
                              </button>
                            ) : (
                              <Link className="btn-donate" to={"/login"}>
                                <img src={donate_icon} alt="" />
                              </Link>
                            )}
                  <div className="profile-title-side">
                    <button className="btnmark" onClick={openModalS}>
                      {" "}
                      <i class="fas fa-map-marker-alt"></i>
                    </button>
                    <a href={product.website}>
                      <i class="fas fa-globe"></i>
                    </a>
                  </div>
                </div>
                <div className="profile-id">
                  <a href="">{product.email} </a>
                  <span>Member since Dec 19, 2016</span>
                </div>
                <div className="input-row main-btn button-design">
                  {userInfo ? userInfo.user.id === other_user_id ? null : followers.some(
                      (x, i) => x.id === userInfo.user.id
                    ) ? (
                    <Link onClick={() => follow_user(other_user_id, "other")}>
                      Unfollow
                    </Link>
                  ) : (
                    <Link onClick={() => follow_user(other_user_id, "other")}>
                      Follow
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
            {/* <div className="profile-location">
                            <ul>
                                <li>
                                    <input type="radio" name="location" />
                                    <label><i class="fas fa-map-marker-alt"></i></label>
                                </li>
                                <li>
                                    <input type="radio" name="location" />
                                    <label><i class="fas fa-globe"></i></label>
                                </li>
                            </ul>
                        </div> */}
          </div>
          {/* <div>
            <input type="file" name="file" onChange={changeHandler} />
            {isSelected ? (
              <div>
                
              </div>
            ) : (
              <p>Select a file to show details</p>
            )}
            <div>
              <button onClick={handleSubmission}>Submit</button>
            </div>
          </div> */}

          <div className="profile-tab">
            <Tabs>
              <TabList>
                
                {userInfo? userInfo.user.id === other_user_id ? <Tab>Dashboard</Tab> : null :null}
                <Tab>Photos</Tab>
                
                {userInfo? userInfo.user.id === other_user_id ? <Tab>Downloads</Tab> : null :null}
                {userInfo? userInfo.user.id === other_user_id ? <Tab>Sales</Tab> : null :null}
                {userInfo? userInfo.user.id === other_user_id ? <Tab>Purchases</Tab> : null :null}
                <Tab>Followers</Tab>
                <Tab>Following</Tab>
                <Tab>Collections</Tab>
                <Tab>Tag</Tab>

                {userInfo ?userInfo.user.id === other_user_id ? (
                  <Tab>Subscription</Tab>
                ) : null :null}
              </TabList>

              {/* dashboard */}
              {userInfo ?userInfo.user.id === other_user_id ? (
              <TabPanel>
                <div className="profile-title">
                  <h2>Dashboard</h2>
                </div>
                <div className="dashboard-info">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="dasinfo-box">
                        <div className="dasicon">
                          <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div className="dassales">
                          <span>34</span>
                          Total Sales
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="dasinfo-box">
                        <div className="dasicon">
                          <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div className="dassales">
                          <span>$254</span>
                          Total Earnings
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="dasinfo-box">
                        <div className="dasicon">
                          <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div className="dassales">
                          <span>04</span>
                          Total Sales
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="dasinfo-box">
                        <div className="dasicon">
                          <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div className="dassales">
                          <span>$134</span>
                          Total Earnings
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="chart-block">
                  <div className="row">
                    <div className="col-md-6">
                      <Line
                        data={{
                          labels: [
                            "Red",
                            "Blue",
                            "Yellow",
                            "Green",
                            "Purple",
                            "Orange",
                          ],
                          datasets: [
                            {
                              label: "Sales",
                              data: [12, 19, 3, 5, 2, 3],
                              backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                              ],
                              borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)",
                              ],
                              borderWidth: 1,
                            },
                            {
                              label: "Earning",
                              data: [15, 9, 13, 15, 1, 20],
                              backgroundColor: "orange",
                              borderColor: "red",
                              borderWidth: 1,
                            },
                          ],
                        }}
                        height={400}
                        width={600}
                        options={{
                          maintainAspectRation: false,
                          scales: {
                            yAxes: [
                              {
                                ticks: {
                                  beginAtZero: true,
                                },
                              },
                            ],
                          },
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <Bar
                        data={{
                          labels: [
                            "Red",
                            "Blue",
                            "Yellow",
                            "Green",
                            "Purple",
                            "Orange",
                          ],
                          datasets: [
                            {
                              label: "Sales",
                              data: [2, 8, 3, 5, 2, 3],
                              backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                              ],
                              borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)",
                              ],
                              borderWidth: 1,
                            },
                            {
                              label: "Earninng",
                              data: [5, 9, 5, 2, 4, 1],
                              backgroundColor: "orange",
                              borderColor: "red",
                            },
                          ],
                        }}
                        height={400}
                        width={600}
                        options={{
                          maintainAspectRation: false,
                          scales: {
                            yAxes: [
                              {
                                ticks: {
                                  beginAtZero: true,
                                },
                              },
                            ],
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="dashboard-info">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="dasinfo-box">
                        <div className="dasicon">
                          <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div className="dassales">
                          <span>$340.00</span>
                          Revenue of the day
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="dasinfo-box">
                        <div className="dasicon">
                          <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div className="dassales">
                          <span>$25K</span>
                          Revenue of the Week
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="dasinfo-box">
                        <div className="dasicon">
                          <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div className="dassales">
                          <span>$25K</span>
                          Revenue of the Month
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              ) : null : null}
              {/* photos */}
              <TabPanel>
                <div className="profile-title">
                  <h2>Most Popular Images</h2>
                  <span>
                    {images ? images.length : null} royalty-free
                    stock,photos,vectors, and illustrations.
                  </span>
                </div>
                {userInfo ? userInfo.user.id === other_user_id ? (
                  <div className="download-list">
                    <ul>
                      {product.images &&
                        product.images.map((item, index) => {
                          return (
                            <li>
                              <div className="down-img">
                                <img src={item.preview_full_path} alt="" />
                              </div>
                              <div className="down-name">
                                <h4>{item.title}</h4>
                              </div>
                              <div className="down-label">
                                <h5>{item.item_for_sale}</h5>
                              </div>
                              <div className="down-price">
                                <h5>${item.price}</h5>
                              </div>
                              <div className="down-date">
                                <h5>{item.date}</h5>
                              </div>
                              {isActive ? (
                                <div className="down-btn">
                                  <Link
                                    onClick={() =>
                                      featuredImage(
                                        item.featured === "no" ? 1 : 0,
                                        item.id
                                      )
                                    }
                                  >
                                    {item.featured === "no"
                                      ? "Featured"
                                      : "Unfeatured"}{" "}
                                  </Link>
                                </div>
                              ) : null}
                              {/* <div className="down-btn">
                              <a href="/">Buy Now</a>
                            </div> */}
                            </li>
                          );
                        })}
                      <div className="more-btn">
                        <div class="second-btn">
                          <a href="javascript:void(0)" class="btn">
                            LOAD MORE PHOTOS
                          </a>
                        </div>
                      </div>
                    </ul>
                  </div>
                ) : (
                  <div className="row no-gutters">
                    {product.images &&
                      product.images.map((item, index) => {
                        return (
                          <div className="col-md-4">
                            <Productitem
                              productid={item.id}
                              pslug={item.slug}
                              bgimage={item.preview_full_path}
                              title={item.title}
                              date={item.date}
                              amount={item.price}
                              authname={""}
                              authslug={""}
                              authimage={item.preview_full_path}
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
                              updateDataAfterAction={() =>
                                dispatch(homeScreenData())
                              }
                            />
                          </div>
                        );
                      })}
                  </div>
                ): null}

                {/* {product.images.length > 0 ? ( */}
                {/* <Masonry columnsCount={3} className="profile-img">
                  {product.images &&
                    product.images.map((item, index) => {
                      return (
                        <Link to={`/Product_Details/${item.id}`}>
                          <div class="feature">
                            <div class="feature-img">
                              <img src={item.preview_full_path} />
                            </div>
                            <div className="free-lable">
                              <div class="label_free">
                                {" "}
                                <a href="">{item.how_use_image}</a>
                              </div>
                              <div class="wishlist">
                                {" "}
                                <a href="">
                                  <i class="fa fa-heart"></i>
                                </a>
                              </div>
                            </div>
                            <div class="feature-content">
                              <div class="feature-name">
                                <div class="feature_lable">
                                  <Link to={`/Product_Details/${item.id}`}>
                                    <h3>{item.title} </h3>
                                  </Link>
                                  <span>3 Days Ago</span>
                                  <p>${item.price}</p>
                                </div>
                                <div class="wishlist">
                                  <a href="">
                                    <i class="fa fa-heart"></i>
                                  </a>
                                  <Link to={`/Product_Details/${item.id}`}>
                                    <i class="fa fa-link"></i>
                                  </Link>
                                </div>
                              </div>
                              <div class="auther">
                                <img src={product.avatar_full_path} alt="" />
                                <span>{product.username}</span>
                              </div>
                              <div class="bottom-part">
                                <div class="like">
                                  <div class="download">
                                    <i
                                      class="fa fa-download"
                                      aria-hidden="true"
                                    ></i>
                                    <span>{item.downloads.length}</span>
                                  </div>
                                  <div class="download">
                                    <i class="fa fa-heart" aria-hidden="true"></i>
                                    <span>{item.likes.length}</span>
                                  </div>
                                </div>
                                <div class="main-btn">
                                  <Link
                                    to={`/Product_Details/${item.id}`}
                                    class="btn"
                                  >
                                    buy now
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </Masonry>
                */}
                {/* ) : null} */}
              </TabPanel>

              {/* download */}
              {userInfo ?userInfo.user.id === other_user_id ? (
              <TabPanel>
                <div className="profile-title">
                  <h2>My Downloads</h2>
                  <span>
                    {downloads ? downloads.length : null} royalty-free
                    stock,photos,vectors, and illustrations.
                  </span>
                </div>
                <div className="download-list">
                  <ul>
                    {downloads &&
                      downloads.map((item, index) => {
                        return (
                          <li>
                            {item.image ? (
                              <div className="down-img">
                                <img
                                  src={item.image.thumbnail_full_path}
                                  alt=""
                                />
                              </div>
                            ) : null}
                            {item.image ? (
                              <div className="down-name">
                                <h4>{item.image.title}</h4>
                              </div>
                            ) : null}
                            <div className="down-label">
                              <h5>{item.type}</h5>
                            </div>
                            {item.image ? (
                              <div className="down-price">
                                <h5>${item.image.price}</h5>
                              </div>
                            ) : null}
                            <div className="down-date">
                              <h5>{item.date}</h5>
                            </div>
                            <div className="down-btn">
                              <a href={item.image? item.image.thumbnail_full_path : '#'} download>Download</a>
                            </div>
                          </li>
                        );
                      })}
                    {/* <div className="more-btn">
                      <div class="second-btn">
                        <a href="javascript:void(0)" class="btn">
                          LOAD MORE PHOTOS
                        </a>
                      </div>
                    </div> */}
                  </ul>
                </div>
              </TabPanel>
              ) : null : null}
              {/* Sales */}
              {userInfo ?userInfo.user.id === other_user_id ? (
                <TabPanel>
                  <div className="profile-title">
                    <h2>My Sale</h2>
                    <span>{(product.sales)?product.sales.length: 0}  Items Sales</span>
                  </div>
                  <div className="download-list">
                    <ul>
                    {product.sales &&
                        product.sales.map((sale, index) => {
                          return (
                      <li>
                        <div className="down-img">
                          <img src={sale.images.preview_full_path} alt="" />
                        </div>
                        <div className="down-name">
                          <h4>
                            {sale.images.title}
                          </h4>
                        </div>
                        {/* <div className="down-label">
                          <h5>Free</h5>
                        </div> */}
                        <div className="down-price">
                          <h5> $ {sale.images.price}</h5>
                        </div>
                        <div className="down-date">
                          <h5>{sale.date_format}</h5>
                        </div>
                        {/* <div className="down-btn">
                          <a href={sale.images.preview_full_path} download>Download</a>
                        </div> */}
                      </li>);
                        })}
{/*                      
                      <div className="more-btn">
                        <div class="second-btn">
                          <a href="javascript:void(0)" class="btn">
                            LOAD MORE PHOTOS
                          </a>
                        </div>
                      </div> */}
                    </ul>
                  </div>
                </TabPanel>
              ) : null : null}

              {/* Purchases */}
              {userInfo ?userInfo.user.id === other_user_id ? (
                <TabPanel>
                  <div className="profile-title">
                    <h2>My Purchase</h2>
                    <span>{(product.purchases)?product.purchases.length: 0}  Items Sales</span>
                  </div>
                  <div className="download-list">
                    <ul>
                    {product.purchases &&
                        product.purchases.map((purchase, index) => {
                          return (
                      <li>
                        <div className="down-img">
                          <img src={purchase.images.preview_full_path} alt="" />
                        </div>
                        <div className="down-name">
                          <h4>
                            {purchase.images.title}
                          </h4>
                        </div>
                        {/* <div className="down-label">
                          <h5>Free</h5>
                        </div> */}
                        <div className="down-price">
                          <h5> $ {purchase.images.price}</h5>
                        </div>
                        <div className="down-date">
                          <h5>{purchase.date_format}</h5>
                        </div>
                        <div className="down-btn">
                          <a href={purchase.images.preview_full_path} download>Download</a>
                        </div>
                      </li>);
                        })}
{/*                      
                      <div className="more-btn">
                        <div class="second-btn">
                          <a href="javascript:void(0)" class="btn">
                            LOAD MORE PHOTOS
                          </a>
                        </div>
                      </div> */}
                    </ul>
                  </div>
                </TabPanel>
              ) : null : null}


              {/* Followers */}
              <TabPanel>
                <div className="profile-title">
                  <h2>Followers</h2>
                  <span>{followers.length} Followers</span>
                </div>
                <div className="followers-profile">
                  <ul>
                    {followers.map((item, index) => {
                      return (
                        <li>
                          <div className="followers-box">
                            <Link
                              to={{
                                pathname: `/${item.username}`,
                                state: item.id,
                              }}
                            >
                              <div className="followers-img">
                                <img src={item.avatar_full_path} alt="" />
                              </div>
                            </Link>
                            <div className="followers-name">
                              <h3>{item.username}</h3>
                              <span>Member Since {new Date(item.date
                                        ).toLocaleDateString(
                                          "en-US",
                                          DATE_OPTIONS
                                        )}
                                        </span>
                            </div>
                            <div className="followers-count">
                              <h4>
                                {item.followers.length}
                                <span>Followers</span>
                              </h4>
                              <h4>
                                5<span>PHOTOS</span>
                              </h4>
                            </div>
                            {/* <div className="input-row main-btn button-design">
                              <Link onClick={() => follow_user(item.id)}>
                                {following.some((x, i) => x.id === item.id)
                                  ? "Unfollow"
                                  : "Follow"}
                              </Link>
                            </div> */}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </TabPanel>

              {/* Following */}
              <TabPanel>
                <div className="profile-title">
                  <h2>Following</h2>
                  <span>{following.length} Following</span>
                </div>
                <div className="followers-profile">
                  <ul>
                    {following.map((item, index) => {
                      return (
                        <li>
                          <div className="followers-box">
                            <Link
                              to={{
                                pathname: `/${item.username}`,
                                state: item.id,
                              }}
                            >
                              <div className="followers-img">
                                <img src={item.avatar_full_path} alt="" />
                              </div>
                            </Link>
                            <div className="followers-name">
                              <h3>{item.username}</h3>
                              <span>Member Since {new Date(item.date
                                        ).toLocaleDateString(
                                          "en-US",
                                          DATE_OPTIONS
                                        )}</span>
                            </div>
                            <div className="followers-count">
                              <h4>
                                {item.followers.length}
                                <span>Followers</span>
                              </h4>
                              <h4>
                                16
                                <span>PHOTOS</span>
                              </h4>
                            </div>
                            {/* <div className="input-row main-btn button-design">
                              <Link onClick={() => follow_user(item.id)}>
                                Unfollow
                              </Link>
                            </div> */}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </TabPanel>

              {/* Collections */}
              <TabPanel>
                <div className="row align-items-center">
                  <div className="profile-title">
                    <h2>My Collections</h2>
                    <span>
                      {collections ? collections.length : null} Collections
                    </span>
                  </div>
                  <div className="title-btn">
                    <a href="/">Create New Collections</a>
                  </div>
                </div>
                <div className="Collections-list">
                  <ul>
                    {collections &&
                      collections.map((item, index) => {
                        return (
                          <li>
                            <div className="Collections-name">
                              <h3>{item.title}</h3>
                              <span>{item.collection_images.length} Items</span>
                            </div>
                            <div className="Collections-img">
                              <ul>
                                {item.collection_images.map((value, index) => {
                                  if (index < 5) {
                                    return (
                                      <li>
                                        <img
                                          src={value.image.thumbnail_full_path}
                                          alt=""
                                        />
                                      </li>
                                    );
                                  }
                                })}
                              </ul>
                              <a href="/">
                                <i class="fas fa-ellipsis-v"></i>
                              </a>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </TabPanel>

              {/* tags */}
              <TabPanel>
                <div className="profile-title">
                  <h2>My Tag</h2>
                  <span>
                    Tag ({producttag.length > 0 ? producttag.length : null})
                    royalty-free stock,photos,vectors, and illustrations.
                  </span>
                </div>
                <div className="our-tag">
                  {producttag.length > 0 ? (
                    <ul>
                      {producttag &&
                        producttag.map((item, index) => {
                          return (
                            <li>
                              <Link to={`/tags/${item.slug}`}>{item.tags}</Link>
                            </li>
                          );
                        })}
                    </ul>
                  ) : null}
                </div>
              </TabPanel>

              {/* subscription */}
              {userInfo ?userInfo.user.id === other_user_id ? (
                <TabPanel>
                  <div className="profile-title">
                    <h2>My Subscription</h2>
                  </div>
                  <div className="download-list">
                    <ul>
                    
                      {subscription &&
                        subscription.map((item, index) => {
                          return (
                            <li
                              className={
                                item.is_active == 1
                                  ? "active-list"
                                  : "inactive-list"
                              }
                            >
                              <div
                                className="down-name"
                                style={{ marginLeft: "2%" }}
                              >
                                <h4>{item.name}</h4>
                              </div>

                              <div className="down-price">
                                <h5>${item.amount}</h5>
                              </div>

                              <div
                                className={isActive ? "down-btn1" : "down-btn"}
                              >
                                {isActive ? (
                                  item.is_active == 1 ? (
                                    <Link className="subscribed">
                                      Subscribed
                                    </Link>
                                  ) : (
                                    <Link>Buy Now</Link>
                                  )
                                ) : (
                                  <Link
                                    onClick={() => {
                                      setSubscription_item(item);
                                      setIsOpenBuynow(true);
                                    }}
                                  >
                                    Buy Now
                                  </Link>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      <div className="more-btn">
                        <div class="second-btn">
                          <Link to={"/subscription"} class="btn">
                            Show Subscription History
                          </Link>
                        </div>
                      </div>
                    </ul>
                  </div>
                </TabPanel>
              ) : null : null }
            </Tabs>
          </div>
        </div>

        <Footer />
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <div className="modal-title">
              <img src={logo} alt="Logo" />
            </div>
            <button onClick={closeModal}>
              <i class="fas fa-times-circle"></i>
            </button>
          </div>
          <div>
            <div class="uploadtext">
              <input type="file" name="file" onChange={changeHandlercover} />
              {isSelectedcover ? (
                <div className="uploadname">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <p>Filename: {selectedFilecovername}</p>
                </div>
              ) : (
                <div>
                  <i class="fas fa-cloud-upload-alt"></i>
                  <div class="filer-input-text">
                    <h3 class="margin-bottom-10">click to upload an photo</h3>
                    <h3>
                      The photo must be greater than or equal to: 1280x720 - 2MB{" "}
                    </h3>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div class="second-btn">
                <Link onClick={handleSubmissioncover}>
                  Upload Cover images{" "}
                </Link>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={modalIsOpenC}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModalS}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <div className="modal-title">
              <img src={logo} alt="Logo" />
            </div>
            <button onClick={closeModalS}>
              <i class="fas fa-times-circle"></i>
            </button>
          </div>
          <div>
          <br/>
           <h2 className="text-center">{product.country_name}</h2>
          </div>
        </Modal>

        <Modal
          isOpen={modalIsOpenprofile}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <div className="modal-title">
              <img src={logo} alt="Logo" />
            </div>
            <button onClick={closeModal}>
              <i class="fas fa-times-circle"></i>
            </button>
          </div>
          <div>
            <div class="uploadtext">
              <input type="file" name="file" onChange={changeHandler} />
              {isSelected ? (
                <div className="uploadname">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <p>Filename: {selectedFilename}</p>
                </div>
              ) : (
                <div>
                  <i class="fas fa-cloud-upload-alt"></i>
                  <div class="filer-input-text">
                    <h3 class="margin-bottom-10">click to upload an photo</h3>
                    <h3>
                      The photo must be greater than or equal to: 150X150 - 1MB{" "}
                    </h3>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div class="second-btn">
                <Link onClick={handleSubmission}>Upload Profile image</Link>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={modalIsOpeneditprofile}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModalss}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <div className="modal-title">
              <img src={logo} alt="Logo" />
            </div>
            <button onClick={closeModalss}>
              <i class="fas fa-times-circle"></i>
            </button>
          </div>
          <div>
            <h3>Update Profile</h3>
            <div className="input-boxes">
              <div className="input-box">
                <i className="fab fa-instagram"></i>

                <input
                  type="text"
                  placeholder=" Instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
              <div className="input-box">
                <i class="fab fa-facebook"></i>
                <input
                  type="text"
                  placeholder="Facebook"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </div>

              <div className="input-box">
                <i class="fas fa-globe"></i>
                <input
                  type="text"
                  placeholder=" Website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className="input-box">
                <i class="fab fa-twitter"></i>
                <input
                  type="text"
                  placeholder=" Twitter"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
              <div className="input-box">
                <i class="fas fa-user"></i>
                <textarea
                  placeholder=" Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div>
              <div class="second-btn">
                <Link onClick={handleSubmissionnew}>Update Profile</Link>
              </div>
            </div>
          </div>
        </Modal>
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
              (donate_item != "")?
            <DonateStripCheckout
              user_id={userInfo.user.id}
              item={donate_item}
            /> : Notification("error", "Error!", "Please enter Amount!")
          ) : paymentTyped === "paypal"  ? (
            (donate_item != "")?
            <DonatePaypal
              user_id={userInfo.user.id}
              item={donate_item}
              closeModel={() => {
                setIsOpendonate(false);
                setDonate_item('');

                // getDonateList(userInfo.user.id);
              }}
            />
            : Notification("error", "Error!", "Please enter Amount!")
          ) : null}
              {/* <div class="second-btn">
                <Link onClick={handleSubmissionnew}>Update Profile</Link>
              </div> */}
            </div>
          </div>
        </Modal>

        {/* buy now modal */}
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
          <div className="input-row row ">
            <div className="col Category_list">
              <label for="Category101"> Payment Type</label>
              <ul>
                <li>
                  <input
                    type="radio"
                    id="Category101"
                    name="Category"
                    value="stripe"
                    checked={paymentType === "stripe"}
                    onChange={(event) => setPaymentType(event.target.value)}
                  />
                  <label for="Category101"> Stripe</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="Category102"
                    name="Category"
                    value="paypal"
                    checked={paymentType === "paypal"}
                    onChange={(event) => setPaymentType(event.target.value)}
                  />
                  <label for="Category102"> Paypal</label>
                </li>
              </ul>
            </div>
          </div>

          {paymentType === "stripe" ? (
            <StripCheckout
              user_id={userInfo.user.id}
              item={subscription_item}
            />
          ) : paymentType === "paypal" ? (
            <Paypal
              user_id={userInfo.user.id}
              item={subscription_item}
              closeModel={() => {
                setIsOpenBuynow(false);
                getSubscriptionList(userInfo.user.id);
              }}
            />
          ) : null}

          {/* <div className="input-row main-btn button-design">
            <Link onClick={() => console.log(paymentType)} >Submit</Link>
          </div> */}
        </Modal>
      </div>
      {/* :
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
      } */}
    </>
  );
};
export default PGprofiles;
