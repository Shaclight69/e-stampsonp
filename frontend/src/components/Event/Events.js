import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getEvent } from "../../actions/eventAction";
import Loader from "../layouts/Loader/Loader";
import EventCard from "./EventCard";
import MetaData from "../layouts/MetaData";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import Navbar from "../layouts/Header/Navbar";
import Announcements from "../layouts/Event/Announcements";

const CardsContainer = styled.div`
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
`;

const Events = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);

  const keyword = match.params.keyword;
  const {
    events,
    loading,
    error,
    eventsCount,
    resultPerPage,
    filteredEventsCount,
  } = useSelector((state) => state.events);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  let count = filteredEventsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getEvent(keyword, currentPage));
  }, [dispatch, keyword, currentPage, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Announcements />
          <Navbar />
          <MetaData title="Events -- eStamps ONP" />
          <h2 className="productsHeading">Post Office Events</h2>

          <CardsContainer>
            {events &&
              events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
          </CardsContainer>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={eventsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Events;
