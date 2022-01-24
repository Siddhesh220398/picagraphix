import React, { Component, useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import Urls from "../Config/Urls";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../components/notification";

import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

// images path
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};
const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  padding: 4,
  boxSizing: "border-box",
};
const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};
const img = {
  display: "block",
  width: "auto",
  height: "100%",
};
function UploadImages() {
  // Tag Const
  const [tags, setTags] = React.useState([]);
  // const [filepath, setfile] = React.useState("");

  // Login Is  Const
  const [userid, setuserid] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const [photo, getPhoto] = useState([]);
  // upload Data List
  const [title, settitle] = useState("");
  const [item_for_sale, setitem_for_sale] = useState("");
  const [categories_id, setcategories_id] = useState("");
  const [price, setprice] = useState("");
  const [how_use_image, sethow_use_image] = useState("");
  const [type_image, settype_image] = useState("");
  const [attribution_required, setattribution_required] = useState("");
  const [description, setdescription] = useState("");

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));
  useEffect(
    () => () => {
      getpichacategories();
      if (userInfo) {
        var id = userInfo.user.id;
        setuserid(id);
      }
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      console.log("login", userid);
    },
    [files, userInfo]
  );
  const getuploaddata = async () => {
    const formData = new FormData();
    formData.append("photo", files[0]);
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("item_for_sale", item_for_sale);
    formData.append("categories_id", categories_id);
    formData.append("price", price);
    formData.append("how_use_image", how_use_image);
    formData.append("type_image", type_image);
    formData.append("attribution_required", attribution_required);
    formData.append("description", description);
    formData.append("user_id", userid);
    console.log(files)
    for (var [key, value] of formData.entries()) {
      console.log(key + " : " + value);
    }
    // console.log({
    //   uri: files[0].path,
    //   name: files[0].name,
    //   type: files[0].type
    // })

    console.log('fileupload', files)
    axios
      .post(`${Urls.base_url}upload-image/`, formData)
      .then(async (response) => {
        console.log("upload data  : ", response.data)
        if (response.data.success) {
          Notification("success", "Success!", "success upload");

          return;
        } else {
          Notification("error", "Error!", "error upload");

          return;
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getdeleteimg = async () => {
    setFiles([]);
  };
  const getpichacategories = async () => {
    await axios
      .get(`${Urls.base_url}all-category`)
      .then(async (response) => {
        await getPhoto(response.data.category);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  return (
    <div className="skin-1">
      <Header />
      <section className="inner-banner-sec">
        <div className="container">
          <h1>Upload Images</h1>
          {/* <p>We love helping you bring ideas to life.</p> */}
        </div>
      </section>
      <div className="container pt-5 mt-5">
        <Upload>
          <div class="alert alert-warning" role="alert">
            <ul class="padding-zero">
              <li class="margin-bottom-10">
                <i class="fas fa-exclamation-triangle"></i>
                Please read the terms and conditions to avoid sanctions
              </li>
              <li class="margin-bottom-10">
                <i class="fas fa-info-circle"></i> You can upload 100 photos per
                day
              </li>
              <li class="margin-bottom-10">
                <i class="fas fa-info-circle"></i> It is not allowed images of
                violence or pornographic content of any kind
              </li>
              <li class="margin-bottom-10">
                <i class="fas fa-info-circle"></i>
                Photos must be of Authoring
              </li>
            </ul>
          </div>
          <div className="form-box profile_form">
            <Form>
              <div className="input-row row">
                <div class="col">
                  <div {...getRootProps({ className: "dropzone" })}>
                    {files && files == "" ? null : (
                      <div
                        class="btn btn-danger btn-sm btn-remove-photo display-none"
                        onClick={() => getdeleteimg()}
                      >
                        <i class="fas fa-trash-alt"></i> Delete
                      </div>
                    )}
                    <input {...getInputProps()} />
                    {files && files == "" ? (
                      <div className="uploadtext">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <div class="filer-input-text">
                          <h3 class="margin-bottom-10">
                            Drag and drop or click to upload an photo
                          </h3>
                          <h3>
                            The photo must be greater than or equal to: 1280x720
                            - 2MB{" "}
                          </h3>
                        </div>
                      </div>
                    ) : null}
                    <aside style={thumbsContainer}>{thumbs}</aside>
                  </div>
                </div>
              </div>
              <div className="input-row row">
                <div class="col">
                  <label>Title</label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Title"
                    onChange={(value) => settitle(value.target.value)}
                  />
                </div>
              </div>
              <div className="input-row row">
                <div class="col">
                  <label>Price</label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Price"
                    onChange={(value) => setprice(value.target.value)}
                  />
                </div>
              </div>
              <div className="input-row row">
                <div class="col">
                  <label>Tags</label>
                  <ReactTagInput
                    tags={tags}
                    onChange={(newTags) => setTags(newTags)}
                    title={"testtt"}
                  />
                  <span
                    style={{
                      opacity: "0.5",
                      color: "#000",
                      padding: "3px 0 0 3px",
                    }}
                  >
                    * Press Enter or comma to add tag (Maximum 10 tags)
                  </span>
                  <div className="input-row main-btn button-design">
                  </div>
                </div>
              </div>
              <div className="input-row row">
                <div class="col">
                  <label>Category</label>
                  <Form.Control
                    as="select"
                    onChange={(value) => setcategories_id(value.target.value)}
                  >
                    <option>Select Category</option>
                    {photo &&
                      photo.map((item, index) => {
                        return <option value={item.id}>{item.name}</option>;
                      })}
                  </Form.Control>
                </div>
              </div>
              <div className="input-row row">
                <div class="col">
                  <label>Item for sale?</label>
                  <Form.Control
                    as="select"
                    onChange={(value) => setitem_for_sale(value.target.value)}
                  >
                    <option>Select Item for sale?</option>
                    <option value="free">Free</option>
                    <option value="sale">Sale</option>
                  </Form.Control>
                </div>
              </div>
              <div className="input-row row">
                <div class="col">
                  <label>How they can use this photo</label>
                  <Form.Control
                    as="select"
                    onChange={(value) => sethow_use_image(value.target.value)}
                  >
                    <option>Select How they can use this photo</option>
                    <option value="free">Free for commercial use</option>
                    <option value="free_personal">Free for personal use</option>
                    <option value="editorial_only">Editorial use only</option>
                    <option value="web_only">Use only on websites</option>
                  </Form.Control>
                </div>
              </div>
              <div className="input-row row">
                <div class="col">
                  <label>Type of Image?</label>
                  <Form.Control
                    as="select"
                    onChange={(value) => settype_image(value.target.value)}
                  >
                    <option>Select Type of Image?</option>
                    <option value="image">Image (JPG, PNG, GIF)</option>
                    <option value="vector">Image and Vector graphic (AI, EPS, PSD, SVG)</option>
                  </Form.Control>
                </div>
              </div>

              <div className="input-row row">
                <div className="col Category_list">
                  <label>Attribution required</label>
                  <ul>
                    <li>
                      <input
                        type="radio"
                        id="Category101"
                        name="Category"
                        value="yes"
                        onChange={(value) => setattribution_required(value)}
                      />
                      <label for="Category101"> Yes</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="Category102"
                        name="Category"
                        value="no"
                        onChange={(value) => setattribution_required(value)}
                      />
                      <label for="Category102"> No</label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="input-row row">
                <div class="col">
                  <label>Description (Optional)</label>
                  <textarea
                    placeholder="Description"
                    onChange={(value) => setdescription(value.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="input-row main-btn button-design">
                <Link onClick={() => getuploaddata()}>
                  <i class="fas fa-cloud-upload-alt"></i> Upload
                </Link>
              </div>
            </Form>
          </div>
        </Upload>
      </div>

      <section className="container"></section>
      <Footer />
    </div>
  );
}
const Upload = styled.section`
  .input-row {
    .react-tag-input {
      border: none;
      padding: 0px;
    }
  }
  .alert.alert-warning {
    max-width: 900px;
    margin: 0 auto 30px;
    border-color: #e08e0b;
    background-color: #f39c12 !important;
    color: #fff;
    border-radius: 5px;
    .padding-zero {
      list-style: none;
      padding: 0px;
      margin: 0 auto;
      li {
        padding-bottom: 10px;
        i {
          padding-right: 5px;
        }
      }
    }
  }
  .col.Category_list {
    padding: 0 15px;
    border: none;
  }
  .col.Category_list li {
    display: flex;
    align-items: center;
    input {
      height: unset;
    }
    label {
      margin: 0px;
      font-size: 16px;
    }
  }
`;
export default UploadImages;
