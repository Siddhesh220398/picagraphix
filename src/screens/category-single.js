import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Urls from "../Config/Urls";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Productitem from "../components/Productitem";
import { useDispatch, useSelector } from "react-redux";

// images path


function CategorySingle({ match }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [photo, getPhoto] = useState([]);
  const [paginate, getpaginate] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(async () => {
    await getpichaphoto(page);
    window.scrollTo(0, 0)
  }, [match]);

  const getpichaphoto = async (page_no) => {
    await axios
      .get(`${Urls.base_url}category/${match.params.id}?page=${page_no}`)
      .then(async (response) => {
        await getPhoto(response.data.images);
        await getpaginate(response.data.images);
        console.log('data', photo)
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  return (
    <div className="skin-1">
      <Header />
      <section className="inner-banner-sec mb-5">
        <div className="container">
          <h1 className="mb-0" style={{ textTransform: 'capitalize' }}>{match.params.id}</h1>
          <p>( {paginate.total} ) photos available in this category</p>
          {/* <p>{photo.data.length} results found for ' {match.params.id} '</p> */}
        </div>
      </section>
      <div className="recent-sec pt-5">
        <div className="container">
          <div className="row no-gutters">
            {photo.data &&
              photo.data.map((item, index) => {
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
                      updateDataAfterAction={() => getpichaphoto(page)}
                    />
                  </div>
                );
              })}
          </div>
          {/* <div className="row">
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
                          <Link to={`/Product_Details/${item.id}`}>
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
                          <Link to={`/Product_Details/${item.id}`}>
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
                            to={`/Product_Details/${item.id}`}
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
          */}
          {paginate.current_page && paginate.current_page > 1 ? (
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={paginate.last_page}
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
export default CategorySingle;
