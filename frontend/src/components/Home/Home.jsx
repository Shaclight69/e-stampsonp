import React, { Fragment, useEffect } from "react";
import Announcements from "../layouts/Event/Announcements";

import ProductCard from "./ProductCard";
import Slider from "./Slider";
import styled from "styled-components";

import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert";
import SubsCard from "./SubsCard";

import Wrapper from "./Wrapper";
import Navbar from "../layouts/Header/Navbar";
import MetaData from "../layouts/MetaData";

const Title = styled.div`
  margin-top: 20px;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Text = styled.h1`
  font-size: 70px;
  margin-bottom: 50px;
  color: #0a1172;
  margin-top: 50px;
  border-bottom: 2px solid rgba(10, 17, 114);
  padding: 2vmax;
  border-top: 2px solid rgba(10, 17, 114);
`;

const ProductContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
    // dispatch(clearCartItems());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title={`Home -- eStamps ONP`} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Announcements />
          <Navbar />

          <Slider />

          <SubsCard />
          <Title>
            <Text>Latest Emissions</Text>
          </Title>

          <ProductContainer>
            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </ProductContainer>
          <Wrapper />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
