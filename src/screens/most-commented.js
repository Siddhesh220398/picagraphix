import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Urls from "../Config/Urls";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Productitem from '../components/Productitem'
import { useDispatch, useSelector } from "react-redux";

// images path


function MostCommented() {
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const [photo, getPhoto] = useState([]);
  const [page, setPage] = useState(1);
  const [pageUrl, setPageUrl] = useState(`${Urls.base_url}most/commentedfilter`);
  const [category, getCategory] = useState([]);
  const [productCategory, setProductCategory] = useState("");
  const [productSchedule, setProductSchedule] = useState("");
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(12);
  const [pageCount, setPageCount] = useState(0);

  useEffect(async () => {
   
    await getpichacategories();
    await getData(pageUrl);
  }, [page, productSchedule, productCategory]);
  
  const getData = async (pageUrl) => {
    const pUrl =
      pageUrl +
      `?page=${page}&timeframe=${productSchedule}&categories_id=${productCategory}`;

    const res = await axios.get(pUrl);
    const data = res.data.data;
    getPhoto(data);
    setPageCount(res.data.data.last_page);
    console.log("data", res.data.data);
  };
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log("selectedPage", selectedPage);
    setPage(selectedPage + 1);
  };

  
  const getpichacategories = async () => {
    // console.log(`${Urls.base_url}all-category`)
    await axios
      .get(`${Urls.base_url}all-category`)
      .then(async (response) => {
        await getCategory(response.data.category);
        // await setProductCategory(response.data.category[0].id);

        // console.log("data", response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  return (
    <div className="skin-1">
    <Header />
    <section className="inner-banner-sec mb-5">
      <div className="container">
        <h1>Pichagraphix Most Commented Photo</h1>
        <p>Browse stock photos, Videos and Graphic by category</p>
      </div>
    </section>
    <div className="recent-sec pt-5">
      <div className="container">
        <div className="row no-gutters">
          <div className="col-md-3 filter-col">
            <h4 className="filter-title mb-2">Categories</h4>

            {category && category.length > 0
              ? category.map((cat) => {
                  return (
                    <div className="filter-item">
                      <input
                        type="radio"
                        className="filter=item-radio"
                        name="category"
                        value={cat.id}
                        checked={productCategory === cat.id}
                        onClick={() => {
                          setProductCategory(cat.id);
                          setPage(1);
                        }}
                      />
                      <label>{cat.name}</label>
                    </div>
                  );
                })
              : null}
            <h4 className="filter-title mb-2 mt-3">Conditions</h4>

            <div className="filter-item">
              <input
                type="radio"
                className="filter=item-radio"
                name="schedule"
                value="today"
                checked={productSchedule === "today"}
                onClick={() => {
                  setProductSchedule("today");
                  setPage(1);
                }}
              />
              <label>Today</label>
            </div>
            <div className="filter-item">
              <input
                type="radio"
                className="filter=item-radio"
                name="schedule"
                value="week"
                checked={productSchedule === "week"}
                onClick={() => {
                  setProductSchedule("week");
                  setPage(1);
                }}
              />
              <label>This Week</label>
            </div>
            <div className="filter-item">
              <input
                type="radio"
                className="filter=item-radio"
                name="schedule"
                value="month"
                checked={productSchedule === "month"}
                onClick={() => {
                  setProductSchedule("month");
                  setPage(1);
                }}
              />
              <label>This Month</label>
            </div>
            <div className="filter-item">
              <input
                type="radio"
                className="filter=item-radio"
                name="schedule"
                value="year"
                checked={productSchedule === "year"}
                onClick={() => {
                  setProductSchedule("year");
                  setPage(1);
                }}
              />
              <label>This Year</label>
            </div>
          </div>
          {/* <div className="col-md-1"></div> */}
          <div className="col-md-9">
            <div className="row ">
              {photo.data && photo.data.length > 0 ? (
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
                        isLike={
                          userInfo
                            ? item.likes.some(
                                (x, i) => x.user_id === userInfo.user.id
                              )
                            : false
                        }
                        updateDataAfterAction={() => getData(page)}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="col-md-4">
                  <h4>No data Found</h4>
                </div>
              )}
            </div>
          </div>
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
        {photo.data && photo.data.length > 0 ? (
          photo.current_page && photo.current_page > 0 ? (
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          ) : null
        ) : null}
      </div>
    </div>

    <Footer />
  </div>
  );
}
export default MostCommented;
