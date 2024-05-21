import React, { useState } from "react";
import styled from "styled-components";
import { getStarBackgroundImg } from "../mock/main_data";
import BackgroundImageSlider from "../components/BackgroundImageSlider";

const backgroundImg = getStarBackgroundImg();

const Star = () => {
  return (
    <Wrapper>
      <BackgroundImageSlider images={backgroundImg}></BackgroundImageSlider>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Star;
