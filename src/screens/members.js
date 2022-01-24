import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Urls from "../Config/Urls";
import axios from "axios";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
// images path

import logo from '../assets/images/dark-logo.png'

function Members() {
  const [photo, getmember] = useState([]);
  const [page, setPage] = useState(1);

  const [sortname, setsortname] = useState("");
  const [locationname, setlocationname] = useState("");
  const [countrieslist, usecountries] = useState("");
  // Login Is  Const
  const [userid, setuserid] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(async () => {
    if (userInfo) {
      var id = userInfo.user.id;
      setuserid(id);
    }
    await getmemberlist(page, sortname, locationname, id);
    getcountriesdata();
  }, [userInfo]);

  const getfollow = async (followid) => {
    console.log("useriddd", userid);
    await axios
      .get(`${Urls.base_url}follow/${userid}/${followid}`)
      .then(async (response) => {
        // await getmember(response.data.data);
        // console.log('responsi follow', response.data)
        if (response.data.message == "successfully") {
          await getmemberlist(page, sortname, locationname, userid);
          console.log("responsi follow", response.data);
        } else {
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  const getclearefilter = async () => {
    setsortname("");
    setlocationname("");
    await getmemberlist(page, sortname, locationname, userid);
    window.location.reload(false);
  };
  const getmemberlist = async (page_no, sortname, locationname, userrid) => {
    await axios
      .get(
        `${Urls.base_url}allmembers/${userrid}?sort=${sortname}&location=${locationname}&page=${page_no}`
      )
      .then(async (response) => {
        await getmember(response.data.data);
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

  return (
    <div className="skin-1">
      <Header />
      <section className="inner-banner-sec mb-5">
        <div className="container">
          <h1>Pichagraphix Members </h1>
          <p>Browse stock photos, Videos and Graphic by category</p>
        </div>
      </section>
      <div className="recent-sec pt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              {photo.data && photo.data.length > 0 ?
                <div>
                  {photo.data &&
                    photo.data.map((item, index) => {
                      console.log(item)
                      return (
                        <Section>
                          <div class="media">
                            <div class="media-left">
                              <Link to={{ pathname: `/profile/${ item.name }`, state: item.id }}>
                                <img
                                  src={item.avatar_full_path}
                                  class="img-circle avatar-user"
                                />
                              </Link>
                            </div>
                            <div class="media-body text-overflow">
                              <h4 class="media-heading data-user">
                                <Link to={{ pathname: `/profile/${ item.name }`, state: item.id }}>{item.name}</Link>
                              </h4>
                              <ul class="padding-zero list-data-user">
                                <li>
                                  <i
                                    class="far fa-clock myicon-right"
                                    aria-hidden="true"
                                  ></i>
                                  Member since {item.date}
                                </li>
                                <li>
                                  <i
                                    class="fa fa-map-marker myicon-right"
                                    aria-hidden="true"
                                  ></i>
                                  United States
                                </li>
                                {item.website && item.website.length > 0 ? (
                                  <li>
                                    <i class="fa fa-link myicon-right"></i>
                                    <a href={item.website} target="_blank">
                                      {item.website}
                                    </a>
                                  </li>
                                ) : null}
                                {/* {item.id == userid ? null : (
                              <div>
                                {item.is_following == "0" ? (
                                  <li style={{ padding: "3px 0 0 0" }}>
                                    <div class="second-btn">
                                      <a
                                        href="javascript:void(0)"
                                        onClick={() => getfollow(item.id)}
                                      >
                                        <i class="fas fa-plus"></i> Follow
                                      </a>
                                    </div>
                                  </li>
                                ) : (
                                  <li style={{ padding: "3px 0 0 0" }}>
                                    <div class="second-btn green">
                                      <a
                                        href="javascript:void(0)"
                                        onClick={() => getfollow(item.id)}
                                      >
                                        <i class="fas fa-check"></i> following
                                      </a>
                                    </div>
                                  </li>
                                )}{" "}
                              </div>
                            )} */}
                              </ul>
                            </div>
                            <div class="media-right m-right text-center data-stats">
                              <div class="btn-block color-default count-data">
                                {item.following.length
                                  ? `${item.following.length}`
                                  : "0"}
                              </div>
                              <div class="btn-block color-link data-refer">
                                Following
                              </div>
                            </div>
                            <div class="media-right m-right text-center data-stats">
                              <div class="btn-block color-default count-data">
                                {item.followers.length
                                  ? `${item.followers.length}`
                                  : "0"}
                              </div>
                              <div class="btn-block color-link data-refer">
                                Followers
                              </div>
                            </div>
                          </div>
                        </Section>
                      );
                    })}
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
                        await getmemberlist(value.selected + 1);
                      }}
                      containerClassName={"pagination"}
                      activeClassName={"active"}
                    />
                  ) : null}
                </div>
                :
                <div className="nodata">
                  <img src={logo} alt="" />
                  <span>No results have been found</span>
                </div>
              }
            </div>
            <div className="col-md-3">
              <div className="sidbar sticky">
                <div className="Category_list">
                  <h2 className="sidbar-title">Categories</h2>
                  <ul>
                    <li>
                      <input
                        type="radio"
                        id="Category101"
                        name="Category"
                        value="popular"
                        onChange={(value) => setsortname(value.target.value)}
                      />
                      <label for="Category101"> popular</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="Category102"
                        name="Category"
                        value="latest"
                        onChange={(value) => setsortname(value.target.value)}
                      />
                      <label for="Category102"> Latest</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="Category103"
                        name="Category"
                        value="photos"
                        onChange={(value) => setsortname(value.target.value)}
                      />
                      <label for="Category103"> Photos</label>
                    </li>
                  </ul>
                </div>
                <div className="price_list single">
                  <h2 className="sidbar-title">Location</h2>
                  <Form.Control
                    as="select"
                    onChange={(value) => setlocationname(value.target.value)}
                  >
                    <option>All countries...</option>
                    {countrieslist &&
                      countrieslist.map((item, index) => {
                        return (
                          <option value={item.id}>{item.country_name}</option>
                        );
                      })}
                  </Form.Control>
                </div>
                <div className="button-list">
                  <div class="second-btn bg mr-2" onClick={() =>
                    getmemberlist(page, sortname, locationname, userid)
                  }>
                    <a
                      class="btn"
                      href="javascript:void(0)">
                      find
                    </a>
                  </div>
                  <div class="second-btn" onClick={() => getclearefilter()}>
                    <a
                      href="javascript:void(0)">
                      Reset
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
const Section = styled.section`
  background: #fff;
  margin-bottom: 20px;
  border-radius: 3px;
  padding: 30px 15px 30px 30px;
  box-shadow: 0 0 17px 0px rgb(173 173 173/0.4);
  box-sizing: border-box;
  position: relative;
  width: 100%;
  overflow: hidden;
  .media {
    align-items: center;
  }
  .media-left {
    display: table-cell;
    vertical-align: top;
    .avatar-user {
      width: 100px;
      height: 100px;
      display: inline-block;
      margin-right: 15px;
    }
  }
  .text-overflow {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: table-cell;
    vertical-align: top;
    width: 10000px;
    .media-heading {
      margin-top: 0;
      margin-bottom: 5px;
      a {
        color: #333;
      }
    }
    .padding-zero {
      padding: 0 !important;
      margin-top: 0;
      margin-bottom: 10px;
      li {
        list-style: none;
        a {
          color: #bdbdbd;
          margin-bottom: 3px;
        }
        i {
          padding: 0 3px 0 0;
        }
        .second-btn {
          line-height: 35px;
          padding: 0 10px;
          font-size: 12px !important;
          a {
            color: #ff0000;
            font-size: 12px !important;
          }
          :hover a {
            color: #fff;
          }
        }
      }
    }
  }
  .data-stats {
    padding-right: 25px;
    display: table-cell;
    vertical-align: middle;
    padding-left: 10px;
    text-align: center;
    min-width: 110px;
    :last-child {
      border-left: 1px solid #dcdcdc;
      padding-left: 25px;
    }
    .count-data {
      font-size: 22px;
      color: #f00 !important;
      display: block;
      width: 100%;
    }
    .data-refer {
      font-size: 15px;
      color: #bdbdbd;
      margin-top: 5px;
    }
  }
`;

export default Members;
