import React, { useState, Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";
import { widthPercentage } from "../constants/ResponsiveSize";
import { getCategoryList } from "../mock/main_data";
import { useQuery } from "@tanstack/react-query";

interface CategoryListDataProps {
  categoryListData: any[];
  type: string;
  setCateType: Dispatch<SetStateAction<string>> | null;
}

const CategoryList: React.FC<CategoryListDataProps> = ({
  categoryListData,
  type,
  setCateType,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const [activeCategory, setActiveCategory] = useState(
    type === "gallery" && categoryListData ? "전체" : categoryListData[0].title
  );

  const handleCategoryClick = (e: any) => {
    setActiveCategory(e.target.getAttribute("value"));
    if (setCateType) {
      setCateType(e.target.getAttribute("id"));
    }
  };

  return (
    <Container>
      <MainDiv onClick={() => setShowOptions((prev) => !prev)}>
        <ListContainer>
          <ListTitle>{activeCategory}</ListTitle>
          {/* <ListArrow>&#9660;</ListArrow> */}
        </ListContainer>
        <SelectOptionContainer show={showOptions ? "true" : undefined}>
          {categoryListData &&
            categoryListData?.map((category: any, index: any) =>
              type === "gallery" ? (
                <>
                  <CategoryDetail
                    key={index}
                    id={category?.cateId}
                    value={category?.cateName}
                    active={activeCategory === category?.cateName}
                    onClick={handleCategoryClick}
                  >
                    {category?.cateName}
                  </CategoryDetail>
                  {/* {categoryListData?.length - 1 !== index ? (
                    <CategoryLine
                      active={activeCategory === category?.cateName}
                    ></CategoryLine>
                  ) : null} */}
                </>
              ) : (
                <>
                  <CategoryDetail
                    key={index}
                    id={category.title}
                    active={activeCategory === category.title}
                    value={category.title}
                    onClick={handleCategoryClick}
                  >
                    {category.title}
                  </CategoryDetail>
                  {/* {categoryListData?.length - 1 !== index ? (
                    <CategoryLine
                      active={activeCategory === category.title}
                    ></CategoryLine>
                  ) : null} */}
                </>
              )
            )}
        </SelectOptionContainer>
      </MainDiv>
    </Container>
  );
};

const Container = styled.div``;

const MainDiv = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  border: 1px solid #b09464;

  @media (max-width: 1000px) {
  }
`;

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position: relative;
  width: 100%;
  height: 45px;
  /* height: 5.9vh; */
  cursor: pointer;
`;

const ListTitle = styled.div`
  font-size: 1.2em;
  font-weight: 400;
  text-align: center;
  color: #b09464;
`;

const ListArrow = styled.div`
  position: absolute;
  right: 10px;
  font-size: 20px;
  font-weight: 500;
  line-height: 37.52px;
  color: #b09464;
`;

interface CategoryProps {
  active: boolean;
}

const CategoryDetail = styled.button<CategoryProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
  justify-content: center;
  align-items: center;
  background-color: #000407;
  /* border-bottom: 1px solid #747474; */
  cursor: pointer;
  font-size: 1.2em;
  font-weight: 350;
  width: 100%;
  height: 45px;
  text-align: center;
  color: #747474;
  border: none;

  ${(props) =>
    props.active &&
    css`
      color: #b09464;
      font-weight: 400;
    `}
  &:hover {
    color: #b09464;
    font-weight: 400;
  }
`;

const CategoryLine = styled.div<CategoryProps>`
  width: 85%;
  height: 1px;
  background-color: #b09464;
  display: flex;
  align-self: center;

  ${(props) => props.active && css``}
`;

const SelectOptionContainer = styled.div<{ show: any }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  height: ${(props) => (props.show === "true" ? "8vh" : "0")};
  border-top: ${(props) => (props.show === "true" ? "1px solid #b09464" : "0")};
  gap: 10px;
  padding: ${(props) => (props.show === "true" ? "10px 0 10px 0" : "none")};
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// const CircleButton = styled.button<CircleProps>`
//   z-index: 99;
//   width: 70px;
//   height: 70px;
//   border-radius: 50%;
//   background-color: #ccc;
//   margin: 0px 20px 25px 0px;
//   border: none;
//   font-size: 1vw;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;

//   @media (max-width: 800px) {
//     width: 60px;
//     height: 60px;
//     margin: 0px 15px 25px 0px;
//   }

//   ${(props) =>
//     props.active &&
//     css`
//       background-color: rgb(79, 71, 69);
//       color: #fff;
//       font-weight: bold;
//     `}
// `;

export default CategoryList;
