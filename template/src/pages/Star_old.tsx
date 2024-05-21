import React, { useState } from "react";
import styled from "styled-components";
import { getStarBackgroundImg, getSelectBoxList } from "../mock/main_data";
import BackgroundImageSlider_old from "../components/BackgroundImageSlider_old";
import CustomSelect from "../components/CustomSelect";

const backgroundImg = getStarBackgroundImg();
const boxList = getSelectBoxList();

const Star = () => {
  return (
    <Wrapper>
      <TopDiv>
        <TopTitle>2023년 7월 Star</TopTitle>
        <CalendarDiv>
          {/* <CustomSelect datas={boxList.months}></CustomSelect>
          <CustomSelect datas={boxList.years}></CustomSelect> */}
        </CalendarDiv>
      </TopDiv>
      <BackgroundImageSlider_old
        images={backgroundImg}
      ></BackgroundImageSlider_old>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const TopDiv = styled.div`
  width: 100%;
  height: 80px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: rgb(43, 60, 110);
`;

const TopTitle = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
`;

const CalendarDiv = styled.div`
  position: absolute;
  right: 3vw;
  color: white;
  display: flex;
  flex-direction: row;
`;

export default Star;
