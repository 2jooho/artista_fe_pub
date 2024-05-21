import React, { useEffect } from "react";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { main } from "../api/auth/auth";
import { oauthCallback } from "../api/auth/auth";
import { useDispatch } from "react-redux";
import { setToken, setUserData } from "../redux/modules/userData";
import delaybar from "../assets/icons/use/delaybar.gif";

const Redirection = () => {
  const code = window.location.search;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 외부연동
  // axios
  const { data: oauthCallbackData } = useQuery(
    ["oauthCallback"],
    () => oauthCallback(code),
    {
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: (res: any) => {
        console.log(res.data);

        const accessToken = JSON.stringify(res?.headers["authorization"]);
        const refreshToken = JSON.stringify(res?.headers["refreshtoken"]);

        dispatch(
          setUserData({
            userId: res?.data.userId,
            nickname: res?.data.name,
            profileUrl: res?.data.profileUrl,
            instaId: res?.data.instaId,
            isStar: res?.data.isStar,
          })
        );

        dispatch(
          setToken({ accessToken: accessToken, refreshToken: refreshToken })
        );

        navigate("/");
      },
      onError: (error: unknown) => {
        if (error != null) {
          // alert(error);
          console.log(error);
          navigate("/LoginPage");
        } else {
          alert("서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요.");
        }
      },
    }
  );

  return (
    <LoadingDiv>
      <LoadingImg src={delaybar}></LoadingImg>
    </LoadingDiv>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  width: 100%;
  height: 80vh;
`;

const LoadingDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #0000009b;
`;

const LoadingImg = styled.img`
  display: flex;
  width: 30%;
  height: 30%;
  object-fit: contain;
  align-items: center;
  justify-content: center;
`;

export default Redirection;
