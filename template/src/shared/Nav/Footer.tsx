import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  if (
    window.location.pathname === "/PassSuccess/callback" ||
    window.location.pathname === "/aa/KAKAO/callback"
  ) {
    return null;
  }
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>ARTISTA</FooterText>
        <FooterText>Contact: contact@company.com</FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  display: flex;

  border-top: outset;
  border-width: 1px;
  border-color: #b09464;
  background-color: #000407;
  padding: 20px;
  text-align: center;
  bottom: 0;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  margin: 0 auto;
`;

const FooterText = styled.p`
  font-size: 1em;
  font-weight: 400;
  color: #b09464;
  margin: 5px 0;
`;

export default Footer;
