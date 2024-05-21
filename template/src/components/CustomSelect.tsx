import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";
import { widthPercentage } from "../constants/ResponsiveSize";

interface SelectBoxPrps {
  datas: any[];
  type: string;
  setYearIndex: Dispatch<SetStateAction<number>>;
}

interface Option {
  value: string;
  label: string;
}

const CustomSelect: React.FC<SelectBoxPrps> = ({
  datas,
  type,
  setYearIndex,
}) => {
  const [isShowOptions, setShowOptions] = useState(false);
  const [Selected, setSelected] = useState("");
  const [arrayData, setArrayData] = useState<any>([]);

  const onChange: any = (data: string, index: number) => {
    setSelected(data);
    setShowOptions(false);
    if (type === "year") {
      setYearIndex(index);
    }
  };

  useEffect(() => {
    if (datas) {
      setArrayData(datas);
    }
  }, [setArrayData, datas]);

  useEffect(() => {
    // 이거는 에러! console.log(image[0])
    if (datas && datas.length > 0) {
      setSelected(type === "month" ? datas[0] : datas[0].year);
    }
  }, [datas]);

  return (
    <Wrapper
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      {/* <SelectBox onClick={() => setShowOptions((prev) => !prev)}> */}
      <SelectBox>
        <Label>
          {arrayData && type === "year" ? arrayData[0]?.year : arrayData[0]}
        </Label>
      </SelectBox>
      <SelectOptions show={isShowOptions ? "true" : undefined}>
        {arrayData &&
          arrayData.map((data: any, index: number) => (
            <SelectOption
              key={index}
              onClick={() => onChange(data, index)}
              active={
                type === "month" ? Selected == data : Selected == data.year
              }
            >
              {type === "year" ? data?.year : data}
            </SelectOption>
          ))}
      </SelectOptions>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const SelectBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 7.5vw;
  height: 45px;
  background-color: #000407;
  text-align: center;
  border: 1px solid #b09464;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  cursor: pointer;

  /* &::before {
    content: "⌵";
    position: absolute;
    top: -3px;
    right: 10px;
    color: #B09464;
    font-size: 30px;
    font-weight: bold;
  } */
`;

const Label = styled.label`
  font-size: 1.2em;
  font-weight: 400;
  text-align: center;
  color: #b09464;
  cursor: pointer;
`;

interface ShowProps {
  show: any;
}

const SelectOptions = styled.ul<ShowProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  flex-direction: column;
  /* background-color: rgba(0, 4, 7, 0.87); */
  background-color: #000407;
  list-style: none;
  overflow: hidden;
  padding: 0;
  margin: 0;
  height: ${(props) => (props.show === "true" ? "none" : "0")};
  border: ${(props) => (props.show === "true" ? "1px solid #B09464" : "none")};
  border-top: none;
`;

interface SelectProps {
  active: boolean;
}
const SelectOption = styled.li<SelectProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  width: 100%;
  font-size: 1.2em;
  font-weight: 350;
  transition: background-color 0.2s ease-in;
  color: #747474;
  width: 100%;
  height: 45px;
  cursor: pointer;
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

export default CustomSelect;
