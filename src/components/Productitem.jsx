import React from "react";
import { Link } from "react-router-dom";
// const {bgimage,title,date,amount,authname,downloads,likes}=this.props
import auther_icon from "../assets/images/auther-icon.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Urls from "../Config/Urls";

const Productitem = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  // var isLike = props.likes.some((x, i) => x.user_id === userInfo.user.id)
// console.log('props',props)
  const like_unlike = async () => {
    const formData = new FormData();
    formData.append("user_id", userInfo.user.id);
    formData.append("images_id", props.productid);

    console.log(
      "user id : ",
      userInfo.user.id,
      " image id : ",
      props.productid
    );
    await axios
      .post(Urls.base_url + "image-like-unlike", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.success === 1) {
          props.updateDataAfterAction();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="feature">
      <div className="feature-img">
      
        <img src={props.bgimage} />
        {/* <div className="tag-btn">
        {props.amount == 0 ? 
        <div class="bottom-partnew"  >
            <div class="main-btn-f">
              <a class="btn" >
                Free
              </a>
            </div>
          </div>
          : null}
          <div className="feature-names ">
          <div className="wishlist">
              <Link
                className={props.isLike ? "wishlist-like" : "wishlist"}
                onClick={() => (userInfo ? like_unlike() : null)}
              >
                <i class="fa fa-heart"></i>
              </Link>
              </div>
        </div>
        </div> */}
      </div>
      
      <Link
        to={{ pathname: `/image-photo/${props.pslug}`, state: props.productid,slug:props.pslug }}
      >
        <div className="feature-content">
          <div className="feature-name">
            <div className="feature_lable">
            
              <Link
                to={{
                  pathname: `/image-photo/${props.pslug}`,
                  state: props.productid,
                  slug:props.pslug
                }}
              >
                <h3>{props.title}</h3>
              </Link>
              <span> Days Ago</span>
              <p>${props.amount}</p>
            </div>
            {/* <div className="wishlist wishlist-like"> */}
            <div className="wishlist">
              <Link
                className={props.isLike ? "wishlist-like" : "wishlist"}
                onClick={() => (userInfo ? like_unlike() : null)}
              >
                <i class="fa fa-heart"></i>
              </Link>
              <Link
                to={{
                  pathname: `/image-photo/${props.pslug}`,
                  state: props.productid,
                  slug:props.pslug
                }}
              >
                <i class="fa fa-link"></i>
              </Link>
            </div>
          </div>
          <div className="auther">
            <Link
              to={{ pathname: `/profile/${props.authslug}`, state: props.item.user_id }}
            >
              <img src={props.authimage} alt="" />
              <span>{props.authname}</span>
            </Link>
          </div>
          <div className="bottom-part">
            <div className="like">
              <div className="download">
                <i class="fa fa-download" aria-hidden="true"></i>
                <span>{props.downloads}</span>
              </div>
              <div className="download">
                <i class="fa fa-heart" aria-hidden="true"></i>
                <span>{props.likes.length}</span>
              </div>
            </div>
            <div className="main-btn">
              <Link
                to={{
                  pathname: `/image-photo/${props.pslug}`,
                  state: props.productid,
                  slug:props.pslug
                }}
                className="btn"
              >
                buy now
              </Link>
            </div>
          </div>
          {props.amount == 0 ?
          <div class="bottom-partnew">
            <div class="main-btn-f">
              <a class="btn" >
                Free
              </a>
            </div>
          </div>
          : null}
        </div>
      </Link>
    </div>
  );
};
export default Productitem;
