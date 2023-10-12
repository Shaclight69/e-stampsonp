import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import React from "react";
import styled from "styled-components";
import { mobile } from "../../utils/responsive.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../Admin/newProduct.css";
import { logout } from "../../../actions/userAction.js";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const Image = styled.img`
  font-size: 14px;
  cursor: pointer;
  width: 50px;
  height: 40px;
  margin-left: 20px;
  ${mobile({ fontSize: "24px" })}
`;

const imgurl =
  "data:image/png;base64,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";

const Container = styled.div`
  height: 60px;
  padding: 5px;
  box-shadow: 0 2px 4px 0 rgb(219, 219, 255);
  ${mobile({ height: "50px" })};
`;
//

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;
  margin-right: 80px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color:black;
  &:hover,
  &:focus {
    color: #0a1172;
    transform: translateY(-0.2rem) scale(1.1);
    font-weight: bold;

  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

function Navbar() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  function cart() {
    history.push("/cart");
  }

  function wishlist() {
    history.push("/wishlist");
  }

  function loginsignup() {
    history.push("/login");
  }

  function search() {
    history.push("/search");
  }

  const { cartItems } = useSelector((state) => state.cart);
  const { favouriteItems } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
            {" "}
            <Image src={imgurl}></Image>
          </Link>
          <h4
            style={{
              fontWeight: "700",
              fontSize: "14px",
              marginLeft: "10px",
              textDecoration: "none",
              color: "#0a1172",
            }}
          >
            e-Stamps Tunisian Post
          </h4>
        </Left>

        <Center>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <MenuItem>Our Products</MenuItem>
          </Link>
          <Link to="/subscriptions" style={{ textDecoration: "none" }}>
            <MenuItem>Subscriptions</MenuItem>
          </Link>

          <Link to="/events" style={{ textDecoration: "none" }}>
            <MenuItem>Events</MenuItem>
          </Link>
        </Center>
        <Right>
          <MenuItem>
            <SearchIcon onClick={search} />
          </MenuItem>

          <MenuItem>
            <Badge
              badgeContent={cartItems.length}
              color="primary"
              onClick={cart}
            >
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          <MenuItem>
            <Badge
              badgeContent={favouriteItems.length}
              color="primary"
              onClick={wishlist}
            >
              <FavoriteBorderIcon />
            </Badge>
          </MenuItem>
          {isAuthenticated === false ? (
            <MenuItem>
              <LockOpenIcon onClick={loginsignup} />
            </MenuItem>
          ) : (
            <MenuItem>
              <ExitToAppIcon onClick={logoutUser} />
            </MenuItem>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
