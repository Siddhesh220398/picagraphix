import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Urls from "../Config/Urls";
import axios from "axios";
import ReactPaginate from "react-paginate";

// images path

function PichaTag() {
  const [producttag, settag] = useState([]);

  useEffect(async () => {
    await gettag();
  }, []);
  const gettag = async () => {
    await axios
      .get(`${Urls.base_url}tag/`)
      .then(async (response) => {
        await settag(response.data.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  return (
    <div className="skin-1">
      <Header />
      <section className="inner-banner-sec mb-5">
        <div className="container">
          <h1>Pichagraphix Tag </h1>
          <p>Browse stock photos, Videos and Graphic by category</p>
        </div>
      </section>
      <div className="recent-sec pt-5">
        <div className="container">
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
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default PichaTag;
