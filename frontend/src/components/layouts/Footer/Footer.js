import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../../utils/responsive";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })};
  background-color: #f0f8ff;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo Contact style={{ color: "#0a1172" }}>
          E-STAMPS
        </Logo>
        <Desc>
          Welcome to the Official Tunisian Stamps Shop Website.
          <br />
          This site provides you with all your philatelic needs such
          <br /> as emissions, events, and subscriptions.
        </Desc>
        <SocialContainer>
          <a
            target="_blank"
            rel="noreferrer"
            href=" https://www.facebook.com/TunisianPost/"
          >
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/poste_tn/"
          >
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/poste_tn"
          >
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
          </a>
        </SocialContainer>
      </Left>

      <Right>
        <Title Contact style={{ color: "#0a1172" }}>
          Contact
        </Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 40 Street Hedi Cheker Beb El
          Kadhra Tunis 1075- Tunisia
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +216 71 28 31 89
        </ContactItem>

        <ContactItem>
          <MailOutline
            style={{ marginRight: "10px", textDecoration: "none" }}
          />
          <a
            style={{ textDecoration: "none", color: "black" }}
            href="mailto:philatelie@poste.tn"
          >
            {" "}
            philatelie@poste.tn{" "}
          </a>
        </ContactItem>

        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
