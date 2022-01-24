import React, { Component, useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import Urls from "../Config/Urls";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../components/notification";
import Modal from "react-modal";
// images path
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    // marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    OverflowEvent: 'scroll',
    height: '90vh',
  },

};

function AccountPage() {
  const [full_name, setfull_name] = useState("");
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [countries_id, setcountries_id] = useState("");
  const [author_exclusive, setauthor_exclusive] = useState("");
  const [paypal_account, setpaypal_account] = useState("");
  const [website, setwebsite] = useState("");
  const [facebook, setfacebook] = useState("");
  const [twitter, settwitter] = useState("");
  const [instagram, setinstagram] = useState("");
  const [description, setdescription] = useState("");
  const [userid, setuserid] = useState("");
  const userLogin = useSelector((state) => state.userLogin);

  const [countrieslist, usecountries] = useState("");
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [profiledata, setprofiledata] = useState("");
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() { }

  function closeModal() {
    setIsOpen(false);
  }
  const { error, loading, userInfo } = userLogin;
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(async () => {
    await getcountriesdata();
    if (userInfo) {
      var id = await userInfo.user.id;
      await setuserid(id);
    }
    console.log("idd", userid);
    await getprofiledata(id);
  }, [userInfo]);

  const getaccountdata = async () => {

    const formData = new FormData();
    formData.append("user_id", userid);
    formData.append("full_name", full_name);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("countries_id", countries_id);
    formData.append("author_exclusive", author_exclusive);
    formData.append("paypal_account", paypal_account);
    formData.append("website", website);
    formData.append("facebook", facebook);
    formData.append("twitter", twitter);
    formData.append("instagram", instagram);
    formData.append("bio", description);

    axios
      .post(`${Urls.base_url}account`, formData)
      .then(async (response) => {
        console.log("account data", response.data);
        // console.log("emp colors : ", product)
        if (response.data.success) {

          getprofiledata(userid);
          Notification('success', 'Success!', `${response.data.message}`)
          return;

        } else {
          Notification('error', 'Error!', `${response.data.message}`)
          return;
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getcountriesdata = async () => {
    axios
      .get(`${Urls.base_url}countries`)
      .then(async (response) => {
        await usecountries(response.data.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getprofiledata = async (id) => {
    console.log('ffdfd', id)
    axios
      .get(`${Urls.base_url}my-profile/${id}`)
      .then(async (response) => {
        console.log("res : ", response)
        await setprofiledata(response.data.data);
        await setfull_name(response.data.data.name);
        setemail(response.data.data.email);
        setusername(response.data.data.username);
        setcountries_id(response.data.data.countries_id);
        setauthor_exclusive(response.data.data.author_exclusive);
        setpaypal_account(response.data.data.paypal_account);
        setwebsite(response.data.data.website);
        setfacebook(response.data.data.facebook);
        settwitter(response.data.data.twitter);
        setinstagram(response.data.data.instagram);
        setdescription(response.data.data.bio);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getchangepassword = async () => {
    const formData = new FormData();
    formData.append("user_id", userid);
    formData.append("newpassword", newpassword);
    formData.append("oldpassword", oldpassword);

    axios
      .post(`${Urls.base_url}change-password`, formData)
      .then(async (response) => {
        console.log('change-password', response.data)
        if (response.data.success) {
          setnewpassword("");
          setoldpassword("");
          Notification('success', 'Success!', `${response.data.message}`)
          window.location.reload(false);
          return;

        } else {
          Notification('error', 'Error!', `${response.data.message}`)
          return;
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  return (
    <div className="skin-1">
      <Header />
      <section className="inner-banner-sec">
        <div className="container">
          <h1>Account Settings</h1>
          <p>We love helping you bring ideas to life.</p>
        </div>
      </section>

      <div className="container pt-5 mt-5">
        <div className="profile-tab">
          <Tabs>
            <TabList>
              <Tab>Account</Tab>
              <Tab>Password</Tab>
            </TabList>

            {/* profile */}
            <TabPanel>
              <div className="profile-title">
                <h2>Update Profile</h2>
                <span>
                  Tag(15) royalty-free stock,photos,vectors, and illustrations.
                </span>
              </div>
              <div className="form-box profile_form">
                <Form>
                  <div className="input-row row">
                    <div class="col">
                      <label>Full Name</label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter Full Name"
                        value={full_name}
                        onChange={(value) => setfull_name(value.target.value)}
                      />
                    </div>
                    <div class="col">
                      <label>Your Email</label>
                      <Form.Control
                        required
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(value) => setemail(value.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-row row">
                    <div class="col">
                      <label>User Name</label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter User Name"
                        value={username}
                        onChange={(value) => setusername(value.target.value)}
                      />
                    </div>
                    <div class="col">
                      <label>Select Country</label>
                      <Form.Control
                        as="select"
                        value={countries_id}
                        onChange={(value) => setcountries_id(value.target.value)}
                      >
                        <option>Select Country</option>
                        {countrieslist &&
                          countrieslist.map((item, index) => {
                            return <option value={item.id}>{item.country_name}</option>;
                          })}
                      </Form.Control>
                    </div>
                  </div>
                  <div className="input-row row">
                    <div class="col">
                      <label>Exclusivity of your items</label>
                      <Form.Control
                        as="select"
                        value={author_exclusive}
                        onChange={(value) => setauthor_exclusive(value.target.value)}
                      >
                        <option>Select Exclusivity</option>
                        <option value="yes">Exclusive Author</option>
                        <option value="no">Non-exclusive author</option>
                      </Form.Control>
                      <span className="note">
                        * You will receive 90% for each sale
                      </span>
                    </div>
                  </div>
                  <div className="input-row row">
                    <div class="col">
                      <label>PayPal Account</label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="PayPal Account"
                        value={paypal_account}
                        onChange={(value) =>
                          setpaypal_account(value.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="input-row row">
                    <div class="col">
                      <label>Website</label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Website"
                        value={website}
                        onChange={(value) => setwebsite(value.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-row row">
                    <div class="col">
                      <label>Facebook</label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="https://www.facebook.com/username"
                        value={facebook}
                        onChange={(value) => setfacebook(value.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-row row">
                    <div class="col">
                      <label>Twitter</label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="https://www.twitter.com/username"
                        value={twitter}
                        onChange={(value) => settwitter(value.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-row row">
                    <div class="col">
                      <label>Instagram</label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="https://instagram.com/username"
                        value={instagram}
                        onChange={(value) => setinstagram(value.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-row row">
                    <div class="col">
                      <label>Description</label>
                      <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(value) => setdescription(value.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="forgot-pass">
                    <a href="/">Delete my account?</a>
                  </div>
                  <div className="input-row main-btn button-design" onClick={() => getaccountdata()}>
                    <Link>
                      Save changes
                    </Link>
                  </div>
                </Form>
                {/* <button onClick={openModal}><i class="fas fa-pencil-alt"></i></button> */}
              </div>
            </TabPanel>

            {/* change password */}
            <TabPanel>
              <div className="profile-title">
                <h2>Change your password</h2>
                <span>
                  Tag(15) royalty-free stock,photos,vectors, and illustrations.
                </span>
              </div>
              <div className="form-box profile_form">
                <div className="input-row">
                  <div class="col">
                    <label>Old password</label>
                    <Form.Control

                      type="password"
                      placeholder="Old password"
                      onChange={(value) => setoldpassword(value.target.value)}
                    ></Form.Control>
                  </div>
                </div>
                <div className="input-row">
                  <div class="col">
                    <label>New password</label>
                    <Form.Control

                      type="password"
                      placeholder="New password"
                      onChange={(value) => setnewpassword(value.target.value)}
                    ></Form.Control>
                  </div>
                </div>
                <div className="input-row main-btn button-design" onClick={() => getchangepassword()}>
                  <Link>
                    Password Change
                  </Link>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
      {/* <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header" style={{border: 'none', padding: '0px'}}>
            <button onClick={closeModal}>
              <i class="fas fa-times-circle"></i>
            </button>
          </div>
          <div className="form-box profile_form modalform">
                <Form>
                  <div className="input-row row">
                    <div class="col">
                      <label>Full Name</label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter Full Name"
                        // value={'test'}
                        value={full_name}
                        onChange={(value) => setfull_name(value.target.value)}
                      />
                    </div>
                    <div class="col">
                      <label>Your Email</label>
                      <Form.Control
                        required
                        type="email"
                        placeholder="Enter Email"
                        onChange={(value) => setemail(value.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-row row">
                    <div class="col">
                      <label>User Name</label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter User Name"
                        onChange={(value) => setusername(value.target.value)}
                      />
                    </div>
                    <div class="col">
                      <label>Select Country</label>
                      <Form.Control
                      as="select"
                      onChange={(value) => setcountries_id(value.target.value)}
                    >
                        <option>Select Country</option>
                        {countrieslist &&
                          countrieslist.map((item, index) => {
                            return <option value={item.id}>{item.country_name}</option>;
                          })}
                      </Form.Control>
                    </div>
                  </div>
                  <div className="input-row row">
                    <div class="col">
                      <label>Exclusivity of your items</label>
                      <Form.Control
                      as="select"
                      onChange={(value) => setauthor_exclusive(value.target.value)}
                    >
                        <option>Select Exclusivity</option>
                        <option value="yes">Exclusive Author</option>
                        <option value="no">Non-exclusive author</option>
                      </Form.Control>
                      <span className="note">
                        * You will receive 90% for each sale
                      </span>
                    </div>
                  </div>
                  <div className="input-row row">
                    <div class="col">
                      <label>PayPal Account</label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="PayPal Account"
                        onChange={(value) =>
                          setpaypal_account(value.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="input-row row">
                    <div class="col">
                      <label>Website</label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Website"
                        onChange={(value) => setwebsite(value.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-row row">
                    <div class="col">
                      <label>Facebook</label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="https://www.facebook.com/username"
                        onChange={(value) => setfacebook(value.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-row row">
                    <div class="col">
                      <label>Twitter</label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="https://www.twitter.com/username"
                        onChange={(value) => settwitter(value.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-row row">
                    <div class="col">
                      <label>Instagram</label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="https://instagram.com/username"
                        onChange={(value) => setinstagram(value.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-row row">
                    <div class="col">
                      <label>Description</label>
                      <textarea
                        placeholder="Description"
                        onChange={(value) => setdescription(value.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="forgot-pass">
                    <a href="/">Delete my account?</a>
                  </div>
                  <div className="input-row main-btn button-design" onClick={() => getaccountdata()}>
                    <Link>
                      Save changes
                    </Link>
                  </div>                  
                </Form>
              </div>
         </Modal> */}
      <Footer />
    </div>
  );
}
export default AccountPage;
