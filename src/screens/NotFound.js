import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// images path

function NotFound() {
  return (
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
export default NotFound;
