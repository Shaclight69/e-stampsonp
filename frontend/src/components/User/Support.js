import React, { Fragment, useRef, useState } from "react";
import MetaData from "../layouts/MetaData";
import "./Support.css";
import emailjs from "@emailjs/browser";
import { useAlert } from "react-alert";
import Loader from "../layouts/Loader/Loader.js";
import Navbar from "../layouts/Header/Navbar";
import Announcements from "../layouts/Event/Announcements";

const Support = () => {
  const alert = useAlert();
  const { loading } = useState();

  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_lujt7vs",
        "template_jwb9wzq",
        formRef.current,
        "pXroB7eLE3gsDzLcY"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert.success(
            "Thanks for your report we will reply it in very soon..."
          );
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Support -- eStamps ONP`} />
          <Announcements />
          <Navbar />
          <MetaData title="Support" />
          <div
            className="support"
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              padding: "50px 0",
            }}
          >
            <h2
              className="support__heading"
              style={{
                textAlign: "center",
              }}
            >
              Hey How can we improve our services
            </h2>
            <h2
              className="support__heading"
              style={{
                textAlign: "center",
              }}
            >
              Report us for something...
            </h2>
            <div>
              <form
                style={{
                  width: "400px",
                  margin: "auto",
                  padding: "20px 0",
                }}
                ref={formRef}
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Write your Name ..."
                  required
                  style={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                    borderBottom: "1px solid #333996",
                    margin: "10px 0",
                    fontSize: "1.2vmax",
                    height: "40px",
                  }}
                  name="from_name"
                />
                <input
                  type="email"
                  placeholder="write your Email ..."
                  required
                  style={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                    borderBottom: "1px solid #333996",
                    margin: "10px 0",
                    fontSize: "1.2vmax",
                    height: "40px",
                  }}
                  name="from_email"
                />
                <input
                  type="text"
                  placeholder="Write a Subject ..."
                  required
                  style={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                    borderBottom: "1px solid #333996",
                    margin: "10px 0",
                    fontSize: "1.2vmax",
                    height: "40px",
                  }}
                  name="subject"
                />
                <textarea
                  cols="30"
                  rows="5"
                  required
                  placeholder="write your message ..."
                  style={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                    borderBottom: "1px solid #333996",
                    margin: "10px 0",
                    fontSize: "1.2vmax",
                  }}
                  name="message"
                ></textarea>
                <button
                  style={{
                    border: "none",
                    cursor: "pointer",
                    width: "100%",
                    background: "#333996",
                    height: "40px",
                    margin: "10px 0",
                    color: "#fff",
                    fontSize: "1.2vmax",
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Support;
