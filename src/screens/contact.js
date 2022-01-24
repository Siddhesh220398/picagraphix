import React, { Component, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom'

// images path
import contact_icon1 from '../assets/images/phone-icon.png';
import contact_icon2 from '../assets/images/email-icon.png';
import contact_icon3 from '../assets/images/chat-icon.png';
import Notification from "../components/notification";
import axios from 'axios';
import Urls from '../Config/Urls';


const Contact = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneno] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const contactus = async () => {
        var isValid = true
        if (username === '') {
            Notification("error", "Error!", "please enter username");
            isValid = false;
        } if (email === '') {
            Notification("error", "Error!", "please enter email");
            isValid = false;
        } if (phoneNo === '') {
            Notification("error", "Error!", "please enter phone number");
            isValid = false;
        } if (subject === '') {
            Notification("error", "Error!", "please enter subject");
            isValid = false;
        } if (message === '') {
            Notification("error", "Error!", "please enter message");
            isValid = false;
        }

        if (isValid) {
            const formData = new FormData()
            formData.append("full_name", username)
            formData.append("email", email)
            formData.append("subject", subject)
            formData.append("message", message)

            await axios.post(Urls.base_url + "contact", formData)
                .then(res => {
                    if (res.data.success) {
                        Notification("success", "Success!", res.data.message);
                        setUsername("")
                        setEmail("")
                        setPhoneno("")
                        setSubject("")
                        setMessage("")
                    }
                    else
                        Notification("error", "Error!", "something went wrong please try again later ");
                })
                .catch(err => {
                    Notification("error", "Error!", "something went wrong please try again later ");
                })
        }
    }

    return (
        <div className="skin-1">
            <Header />
            <section className="inner-banner-sec">
                <div className="container">
                    <h1>Contact us</h1>
                    <p>We want to grow every day. Our goal is to offer the best high-quality content.</p>
                </div>
            </section>
            <section className="contact-form">
                <div className="contact-sec">
                    <div className="container">
                        <div className="top-block">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="call-box">
                                        <div className="contact-icon">
                                            <img src={contact_icon1} alt="" />
                                        </div>
                                        <div className="contact-link">
                                            <a href="tel:(+91) 22 4063 4848">(+91) 22 4063 4848</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="call-box">
                                        <div className="contact-icon">
                                            <img src={contact_icon2} alt="" />
                                        </div>
                                        <div className="contact-link">
                                            <a href="mailto:enquiry@pichagraphix.com">enquiry@pichagraphix.com</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="call-box">
                                        <div className="contact-icon">
                                            <img src={contact_icon3} alt="" />
                                        </div>
                                        <div className="contact-link">
                                            <a href="javascript:void(0)">Live Chat</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="title-box">
                            <h2>Get in Touch!</h2>
                            <p>Contact us for quote, help or to join the team.</p>
                            <div className="border-bottom"></div>
                        </div>
                        <div className="form-box">
                            <div className="input-row">
                                <div className="input-column">
                                    <input type="text" placeholder="Username" name="Username"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="input-column">
                                    <input type="text" placeholder="Email" name="email"
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="input-row">
                                <div className="input-column">
                                    <input type="text" placeholder="Phone No." name="phone"
                                        onChange={(e) => setPhoneno(e.target.value)} />
                                </div>
                                <div className="input-column">
                                    <input type="text" placeholder="Subject" name="Subject"
                                        onChange={(e) => setSubject(e.target.value)} />
                                </div>
                            </div>
                            <div className="input-row">
                                <textarea placeholder="Message" onChange={(e) => setMessage(e.target.value)} ></textarea>
                            </div>

                            <Link onClick={() => contactus()}  className='sBtn'>
                                <div className="input-row main-btn-s">
                                    <a href="javascript:void(0)" class="btn">SEND MESSAGE</a>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )

}
export default Contact;

