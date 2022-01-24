import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Urls from "../Config/Urls";
import axios from "axios";

// images path

function AllCategory() {
  const [photo, getPhoto] = useState([]);

  useEffect(async () => {
    await getpichacategories();
  }, []);
  const getpichacategories = async () => {
    console.log(`${Urls.base_url}all-category`)
    await axios
      .get(`${Urls.base_url}all-category`)
      .then(async (response) => {
        await getPhoto(response.data.category);
        console.log("data", response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  return (
    <div className="skin-1">
      <Header />
      <section className="inner-banner-sec mb-5">
        <div className="container">
          <h1>Pichagraphix Categories ( {photo.length} )</h1>
          <p>Browse stock photos, Videos and Graphic by category</p>
          {/* <p>{photo.data.length} results found for ' {match.params.id} '</p> */}
        </div>
      </section>
      <div class="categories-sec pt-5 border-design">
        <div className="container">
        <div className="row row1">
              {photo &&
                photo.map((item, index) => {
                  return index < 12 ? (
                    <div class="campus-col">
                    <Link to={`/category/${item.slug}`}>
                      <img src={item.images.data[0].preview_full_path} />
                      <div class="layer">
                        <h3>{item.name} <span style={{color: '#fd0501'}}>({item.images.data ? (`${item.images.data.length}`) : null })</span>  </h3>
                      </div>
                    </Link>
                    </div>
                  ) : null;
                })}
            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default AllCategory;
