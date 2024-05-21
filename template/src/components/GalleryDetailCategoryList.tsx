import React, { useState, Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";
import { widthPercentage } from "../constants/ResponsiveSize";
import { getCategoryList } from "../mock/main_data";
import { useQuery } from "@tanstack/react-query";

interface CategoryListDataProps {
  categoryListData: any[];
  categoryName: any;
  setCateType: Dispatch<SetStateAction<string>> | null;
}

const GalleryDetailCategoryList: React.FC<CategoryListDataProps> = ({
  categoryListData,
  categoryName,
  setCateType,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const [activeCategory, setActiveCategory] = useState(
    categoryName ? categoryName : "카테고리"
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
            categoryListData?.map((category: any, index: any) => (
              <>
                {category.cateId === 3 ? null : (
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
                  </>
                )}
              </>
            ))}
        </SelectOptionContainer>
      </MainDiv>
    </Container>
  );
};

const Container = styled.div``;

const MainDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  width: 7.5vw;
  height: 100%;
  border: 1px solid #b09464;

  @media (max-width: 1000px) {
  }
`;

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 35px;
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
  height: 35px;
  background-color: #000407;
  /* border-bottom: 1px solid #b09464; */
  cursor: pointer;
  font-size: 1.2em;
  font-weight: 350;
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
  max-height: ${(props) => (props.show === "true" ? "none" : "0")};
  border-top: ${(props) => (props.show === "true" ? "1px solid #b09464" : "0")};
  overflow: hidden;
`;

export default GalleryDetailCategoryList;
