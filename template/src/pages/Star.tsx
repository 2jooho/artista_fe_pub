import React, { useState } from "react";
import styled from "styled-components";
import { getStarBackgroundImg } from "../mock/main_data";
import BackgroundImageSlider from "../components/BackgroundImageSlider";
import ImageSlider2 from "../components/ImageSlider2";
import StarCarousel from "../components/StarCarousel";
import { heightPercentage, widthPercentage } from "../constants/ResponsiveSize";
import CustomSelect from "../components/CustomSelect";
import { getGallary, getSelectBoxList } from "../mock/main_data";
import { useQuery } from "@tanstack/react-query";
import { starList, starSelectDate } from "../api/star/star";
import backgroundSrc from "../assets/img/star/background-light.jpg";

const boxList = getSelectBoxList();
const backgroundImg = getStarBackgroundImg();

const Star = () => {
  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  const [yearIndex, setYearIndex] = useState<number>(0);
  // 외부연동
  // axios
  const { data: starListData } = useQuery(
    ["starList", year, month],
    () => starList(year, month),
    {
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: (res: any) => {
        // alert(res.data.mainImgUrl);
      },
      onError: (error: unknown) => {
        if (error != null) {
          // alert(error);
          console.log(error);
        } else {
          alert("서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요.");
        }
      },
    }
  );

  const { data: starSelectData } = useQuery(
    ["starSelectDate"],
    () => starSelectDate(),
    {
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: (res: any) => {
        // alert(res.data.mainImgUrl);
      },
      onError: (error: unknown) => {
        if (error != null) {
          // alert(error);
          console.log(error);
        } else {
          alert("서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요.");
        }
      },
    }
  );

  return (
    <Wrapper>
      <Container imgUrl={backgroundSrc}>
        <TitleContainer>
          <TitleBar></TitleBar>
          <MainTitle>STAR</MainTitle>
        </TitleContainer>
        <CalendarDiv>
          <CustomSelect
            datas={starSelectData?.data.starDateDtoList}
            type="year"
            setYearIndex={setYearIndex}
          ></CustomSelect>
          <CustomSelect
            datas={starSelectData?.data.starDateDtoList[yearIndex].month}
            type="month"
            setYearIndex={setYearIndex}
          ></CustomSelect>
        </CalendarDiv>
        <ContainerArt></ContainerArt>
        {/* 캐러셀 */}
        <StarCarousel
          imageInfoList={starListData?.data.starInfoDtoList}
        ></StarCarousel>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

interface ImageProps {
  imgUrl: string;
}
const Container = styled.div<ImageProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 93vh;
  background-image: url(${(props) => props.imgUrl});
  background-size: repeat;
  background-size: 100% 100%;
`;

const TitleContainer = styled.div`
  position: absolute;
  top: 7%;
  left: 3.5%;
`;

const TitleBar = styled.div`
  width: 160px;
  height: 1.5px;
  background-color: #b09464;
  margin-bottom: 10px;
`;

const MainTitle = styled.div`
  font-size: 1.5em;
  text-align: start;
  font-weight: 400;
  line-height: 26px;
  color: #b09464;
`;

const ContainerArt = styled.div`
  position: absolute;
  z-index: -3;
  background-color: rgb(0, 4, 7);
  width: 100%;
  height: 100%;
`;

const CalendarDiv = styled.div`
  position: absolute;
  z-index: 3;
  right: 3.5%;
  top: 7%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// const StarContainer = styled.div`
//   width: ${widthPercentage(250)}%;
//   height: ${heightPercentage(570)}%;
//   display: flex;
//   position: absolute;
//   top: 79%;
//   left: 35%;
//   transform: translate(-50%, -50%);

//   @media (max-width: 700px) {
//   }
// `;

// const StarImg = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: fill;
// `;

export default Star;
