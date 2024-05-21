import React, {
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";
import styled, { css } from "styled-components";

interface SelectCustomProps {
  categoryList: any[];
  type: string;
  setSerchType: Dispatch<SetStateAction<string>> | null;
}

const CheckSelectCustom: React.FC<SelectCustomProps> = ({
  categoryList,
  type,
  setSerchType,
}) => {
  const dropMenuRef = useRef<HTMLDivElement | null>(null);
  const [categoryListData, setCategoryListData] = useState<any[]>(categoryList);
  const [currentValue, setCurrentValue] = useState(
    type === "serch" ? categoryListData[0].title : categoryListData[0]
  );
  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue = (data: any) => {
    setCurrentValue(data.title);
    if (setSerchType) {
      setSerchType(data.type);
    }
  };
  const Arrow = ({ showOptions }: any) => (
    <ArrowWrapper>{showOptions ? "▼" : "▶"}</ArrowWrapper>
  );

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      // useRef current에 담긴 엘리먼트 바깥을 클릭 시 드롭메뉴 닫힘
      if (
        showOptions &&
        dropMenuRef.current &&
        !dropMenuRef.current.contains(e.target)
      )
        setShowOptions(false);
    };
    document.addEventListener("click", handleOutsideClose);

    return () => document.removeEventListener("click", handleOutsideClose);
  }, [showOptions]);

  return (
    <>
      {type === "serch" ? (
        <>
          <SelectBox2
            onClick={() => setShowOptions((prev) => !prev)}
            ref={dropMenuRef}
          >
            <LabelContainer>
              <Label2>{currentValue}</Label2>
              {/* <Arrow showOptions={showOptions} /> */}
            </LabelContainer>
            <SelectOptions2 show={showOptions ? "true" : undefined}>
              {categoryListData &&
                categoryListData?.map((data, index) =>
                  data === currentValue ? null : (
                    <Option2
                      key={data.type}
                      value={data.title}
                      onClick={() => handleOnChangeSelectValue(data)}
                      active={currentValue === data.title}
                    >
                      {data.title}
                    </Option2>
                  )
                )}
            </SelectOptions2>
          </SelectBox2>
        </>
      ) : (
        <>
          <SelectBox onClick={() => setShowOptions((prev) => !prev)}>
            <Label>{currentValue}</Label>
            <SelectOptions show={showOptions ? "true" : undefined}>
              {categoryListData &&
                categoryListData?.map((data, index) => (
                  <Option
                    key={index}
                    value={data}
                    onClick={handleOnChangeSelectValue}
                  >
                    {data}
                  </Option>
                ))}
            </SelectOptions>
          </SelectBox>
        </>
      )}
    </>
  );
};

const SelectBox = styled.div`
  position: relative;
  width: 200px;
  padding: 8px;
  border-radius: 5px;
  background-color: #ffffff;
  border: 1px solid black;
  margin-top: 20px;
  cursor: pointer;

  &::before {
    content: "⌵";
    position: absolute;
    top: 1px;
    right: 8px;
    color: #49c181;
    font-size: 20px;
  }
`;

const Label = styled.label`
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
`;

const SelectOptions = styled.ul<{ show: any }>`
  position: absolute;
  list-style: none;
  top: 18px;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 90px;
  max-height: ${(props) => (props.show === "true" ? "none" : "0")};
  padding: 0;
  border-radius: 8px;
  background-color: #222222;
  color: #fefefe;
`;

const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #595959;
  }
`;

const SelectBox2 = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
  cursor: pointer;
`;

const ArrowWrapper = styled.div`
  position: absolute;
  right: 15px;
  font-size: 25px;
  color: #b09464;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
`;

const Label2 = styled.label`
  font-size: 1.2em;
  text-align: center;
  font-weight: 400;
  color: #b09464;
  cursor: pointer;
`;

const SelectOptions2 = styled.ul<{ show: any }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  top: 71%;
  width: 100%;
  overflow: hidden;
  max-height: ${(props) => (props.show === "true" ? "none" : "0")};
  padding: 0;
  border: ${(props) => (props.show === "true" ? "1px solid #b09464" : "0")};
  background-color: #000407;
`;

interface OptionProps {
  active: any;
}

const Option2 = styled.li<OptionProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 1.2em;
  font-weight: 350;
  padding: 15px 0 15px 0;
  color: #747474;
  transition: background-color 0.2s ease-in;
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

export default CheckSelectCustom;
