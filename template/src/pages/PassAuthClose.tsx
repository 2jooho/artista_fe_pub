import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setSignUpData } from "../redux/modules/signUpData";
import delaybar from "../assets/icons/use/delaybar.gif";
import { useSearchParams } from "react-router-dom";

const PassAuthClose = () => {
  const dispatch = useDispatch();
  let [query, setQuery] = useSearchParams();
  useEffect(() => {
    dispatch(
      setSignUpData({
        name: query.get("name"),
        birth: query.get("birth"),
        phone: query.get("phone"),
      })
    );

    const closeTimeout = setTimeout(() => {
      window.close();
      if (window.opener) window.opener.location.reload();
    }, 2000);
    return () => clearTimeout(closeTimeout);
  }, []);

  return (
    <LoadingDiv>
      <LoadingImg src={delaybar}></LoadingImg>
    </LoadingDiv>
  );
};

const LoadingDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #000407;
`;

const LoadingImg = styled.img`
  display: flex;
  width: 30%;
  height: 30%;
  object-fit: contain;
  align-items: center;
  justify-content: center;
`;

export default PassAuthClose;
