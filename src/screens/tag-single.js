import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Urls from "../Config/Urls";
import axios from "axios";
import ReactPaginate from "react-paginate";
// images path


function TagSingle({match}) {
  const [photo, getPhoto] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(async () => {
    await getpichaphoto(page);
    
  }, []);
  const getpichaphoto = async (page_no) => {
    await axios
      .get(`${Urls.base_url}tagslug/${match.params.id}?page=${page_no}`)
      .then(async (response) => {
        await getPhoto(response.data.images);
        console.log('data', photo)
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  return (
    <div className="skin-1">
      <Header />
      <section className="inner-banner-sec mb-5">
        <div className="container">
          <h1>Pichagraphix Tags {match.params.id}</h1>
          <p>Browse stock photos, Videos and Graphic by category</p>
        </div>
      </section>
      <div className="recent-sec pt-5">
        <div className="container">
          <div className="row">
            {photo.data &&
              photo.data.map((item, index) => {
                return (
                  <div className="col-md-4">
                  <div className="feature" style={{padding: '0px'}}>
                    <div className="feature-img">
                      <img src={item.thumbnail_full_path} style={{width: '100%'}} />
                    </div>
                    <div className="feature-content">
                      <div className="feature-name">
                        <div className="feature_lable">
                          <Link to={{ pathname: `/image-photo/${item.pslug}`, state: item.productid,slug:item.pslug }}>
                            {" "}
                            <h3>{item.title}</h3>
                          </Link>
                          <span>3 Days Ago</span>
                          <p>${item.price}</p>
                        </div>
                        <div className="wishlist">
                          <a href="">
                            <i class="fa fa-heart"></i>
                          </a>
                          <Link to={{ pathname: `/image-photo/${item.pslug}`, state: item.productid,slug:item.pslug }}>
                            <i class="fa fa-link"></i>
                          </Link>
                        </div>
                      </div>
                      {item.users ? (
                        <div className="auther">
                          <img src={item.users.avatar_full_path} alt="" />
                          <span>{item.users.username}</span>
                        </div>
                      ) : null}
                      <div className="bottom-part">
                        <div className="like">
                          <div className="download">
                            <i class="fa fa-download" aria-hidden="true"></i>
                            {item.downloads ? (
                              <span>{item.downloads.length}</span>
                            ) : null}
                          </div>
                          <div className="download">
                            <i class="fa fa-heart" aria-hidden="true"></i>
                            {item.likes ? (
                              <span>{item.likes.length}</span>
                            ) : null}
                          </div>
                        </div>
                        <div className="main-btn">
                          <Link
                            to={{ pathname: `/image-photo/${item.pslug}`, state: item.productid,slug:item.pslug }}
                            className="btn"
                          >
                            buy now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                );
              })}
          </div>
          {photo.current_page && photo.current_page > 1 ? (
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={photo.last_page}
              marginPagesDisplayed={1}
              pageRangeDisplayed={5}
              onPageChange={async (value) => {
                await setPage(value.selected + 1);
                await getpichaphoto(value.selected + 1);
              }}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          ) : null}
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default TagSingle;
