import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/modules/modalData";

interface MenuSelectProps {
  isLogin: any;
  handleLogOut: any;
  isShowOptions: any;
  setShowOptions: Dispatch<SetStateAction<any>>;
}

const MenuSelectItem: React.FC<MenuSelectProps> = ({
  isLogin,
  handleLogOut,
  isShowOptions,
  setShowOptions,
}) => {
  const dispatch = useDispatch();
  const handleModal = (content: string) => {
    dispatch(openModal(content));
  };

  const user = useSelector((state: any) => {
    return state.user;
  });
  const navigate = useNavigate();
  const handleCollection = () => {
    if (!user.userId && user.userId == null) {
      handleModal("로그인이 필요한 서비스입니다. \n 로그인 해주세요");
      navigate("/LoginPage");
      return;
    }
    navigate("/Collection");
  };

  return (
    <Wrapper
      // onMouseEnter={() => setShowOptions(true)}
      // onMouseLeave={() => setShowOptions(false)}
      onClick={() => setShowOptions(!isShowOptions)}
    >
      <SelectBox>
        <Label>MY PAGE</Label>
        <SelectOptions show={isShowOptions ? "true" : undefined}>
          {/* <NavLink
            to="/Collection"
            style={{ textDecoration: "none", color: "inherit" }}
          > */}
          <Option onClick={handleCollection}>PROFILE</Option>
          {/* </NavLink> */}
          <NavLink
            to="/InformationEdit"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Option>ACCOUNT</Option>
          </NavLink>
          {isLogin ? (
            <NavLink
              to="/LoginPage"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Option>LOGIN</Option>
            </NavLink>
          ) : (
            <NavLink
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Option onClick={handleLogOut}>LOGOUT</Option>
            </NavLink>
          )}
        </SelectOptions>
      </SelectBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2000;
`;

const Label = styled.label`
  padding: 0.2vw;
  font-size: 0.8em;
  font-weight: 500;
  color: #b09464;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
  @media (max-width: 1200px) {
    font-size: 15px;
  }
  @media (max-width: 700px) {
    font-size: 7px;
  }
`;

interface ShowProps {
  show: any;
}

const SelectOptions = styled.div<ShowProps>`
  display: ${(props) => (props.show === "true" ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  z-index: 2000;
  list-style: none;
  top: 175%;
  width: 110px;
  overflow: hidden;
  /* max-height: ${(props) => (props.show === "true" ? "none" : "0")}; */
  background-color: #000407;
  color: #747474;
  border: ${(props) => (props.show === "true" ? "1px solid #B09464" : "none")};
  padding: 10px 0 10px 0;
  gap: 20px;
`;

const Option = styled.div`
  display: flex;
  font-size: 0.8em;
  font-weight: 300;
  line-height: 22.99px;
  transition: background-color 0.2s ease-in;
  cursor: pointer;
  &:hover {
    color: #b09464;
    font-weight: 600;
  }
`;

export default MenuSelectItem;
