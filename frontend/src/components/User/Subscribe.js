import axios from "axios";
import styled from "styled-components";
import { Button } from "react-bootstrap";

import React, { Fragment, useEffect, useState } from "react";

import Navbar from "../layouts/Header/Navbar";
import Announcements from "../layouts/Event/Announcements";
import "./Subscribe.css";

import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import MetaData from "../layouts/MetaData";

const CardsContainer = styled.div`
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
`;

const PriceText = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: white;
  text-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`;

const Subscribe = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetchPrices();
  }, []);
  const fetchPrices = async () => {
    const { data: response } = await axios.get("/api/v3/prices");
    setPrices(response.data);
  };

  const createSession = async (priceId) => {
    const { data: response } = await axios.post("/api/v3/session", {
      priceId,
    });

    window.location.href = response.url;
  };

  const backgroundColors = {
    "Stamps Subscription":
      "https://live.staticflickr.com/5185/5640587341_bdd7072186_b.jpg",
    "First Day Envelope":
      "https://mapsonstampsdb.com/scans/tunisia-2011-philanippon-fdc.jpg",
    "Block Sheets": "https://mapsonstampsdb.com/scans/tunisia-396.jpg",
  };

  const description = {
    "Stamps Subscription":
      "The subscription allows you to receive per year the quantity of our Postage Stamps.",
    "First Day Envelope":
      "The subscription allows you to receive per year, the quantity of our First Day Envelope Emissions.",
    "Block Sheets":
      "The subscription allows you to receive per year the quantity of our Block Sheets.",
  };
  const PDF_FORM_URL = "http://localhost:3000/subsform_pdf.pdf";

  const PDFHandler = (url) => {
    const filename = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", filename);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  return (
    <Fragment>
      <MetaData title="Subscriptions" />

      <Announcements />
      <Navbar />
      <Button
        className="pdfBtn"
        onClick={() => {
          PDFHandler(PDF_FORM_URL);
        }}
      >
        <PriceText>
          DOWNLOAD &nbsp;
          <PictureAsPdfIcon />
        </PriceText>
      </Button>
      <CardsContainer>
        {prices.map((price) => {
          return (
            <div className="card-container">
              <div className="image-container">
                <img
                  src={backgroundColors[price.nickname]}
                  alt={price.nickname}
                />
              </div>
              <div className="card-content">
                <div className="card-title">
                  <h3>{price.nickname}</h3>
                </div>
                &nbsp;
                <h6>{description[price.nickname]}</h6>
                &nbsp;
                <p>€{price.unit_amount / 100} per year</p>
                &nbsp;
                <Button
                  id="createProductBtn"
                  variant="primary"
                  className="mt-2"
                  onClick={() => createSession(price.id)}
                >
                  <PriceText>Subscribe now</PriceText>
                </Button>
              </div>
            </div>
          );
        })}
      </CardsContainer>
    </Fragment>
  );
};

export default Subscribe;
