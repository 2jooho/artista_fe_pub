import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { setToken, setUserData } from "../redux/modules/userData";
import { useDispatch } from "react-redux";
import { openModal, openCheckModal } from "../redux/modules/modalData";
import { logIn } from "../api/auth/auth";
import kakaoIcon from "../assets/icons/kakaoIcon.png";
import logo from "../assets/img/main/logo.png";

const LoginPage: React.FC = () => {
  const [userId, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalMsg, setModalMsg] = useState("다시 시도해주세요.");
  // const { isOpenModal, clickModal, closeModal } = useOpenModal();
  const kakaoLink = "";
  const loginHandler = () => {
    window.location.href = kakaoLink;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 리덕스 툴킷 조회
  // const userData = useSelector((state: any) => {
  //   return state.user;
  // });

  const handleModal = (content: string) => {
    dispatch(openModal(content));
  };
  const handleCheckModal = (checkContent: string) => {
    dispatch(openCheckModal(checkContent));
  };

  const setLogin = async (data: any) => mutate(data);
  const { mutate } = useMutation(["logIn"], (data) => logIn(data), {
    retry: false,
    onSuccess: (res: any) => {
      // console.log(res);
      const accessToken = JSON.stringify(res?.headers["authorization"]);
      const refreshToken = JSON.stringify(res?.headers["refreshtoken"]);

      // console.log("accessToken:" + accessToken);
      // console.log("refreshToken:" + refreshToken);

      // console.log("userId:" + res.data.userId);
      dispatch(
        setUserData({
          userId: res?.data.userId,
          nickname: res?.data.nickname,
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
    // onError: (error: unknown) => errorHandler(error),
    onError: (error: unknown) => {
      let errorMsg;
      if (error != null) {
        errorMsg =
          "아이디 혹은 비밀번호가 맞지 않습니다. \n 다시 한번 확인해주세요.";
        setModalMsg(errorMsg);
      } else {
        errorMsg =
          "서비스 접속이 원활하지 않습니다. \n 잠시 후 다시 이용해주세요.";
        setModalMsg(errorMsg);
      }
      handleModal(errorMsg);
    },
  });

  const loginClick = () => {
    let validationMsg;
    if (!userId) {
      validationMsg = "아이디를 입력해주세요";
      setModalMsg(validationMsg);
      handleModal(validationMsg);
      return;
    }
    if (!password) {
      validationMsg = "비밀번호를 입력해주세요";
      setModalMsg(validationMsg);
      handleModal(validationMsg);
      return;
    }

    setLogin({ userId: userId, password: password });
  };

  const joinClick = () => {
    navigate(`/SignupPage`);
  };

  const handleIdFindClick = () => {
    navigate(`/IdFindPage`);
  };

  const handlePwFindClick = () => {
    navigate(`/PwFindPage`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <PageWrapper>
        {/* <ContainerArt></ContainerArt> */}
        {/* <BackgroundOverlay
          src={
            `${loginArt}`
          }
        ></BackgroundOverlay> */}
        <Container>
          <LoginForm onSubmit={handleSubmit}>
            <TopContainer>
              <TitleImg src={logo}></TitleImg>
              {/* <Title>ARTISTA</Title> */}
              {/* <TitleKo>방문을 환영합니다!</TitleKo> */}
            </TopContainer>
            <InputContainer>
              <Input
                type="text"
                placeholder="아이디"
                value={userId}
                onChange={(e: any) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={() => loginClick()}>
                로그인
              </Button>
              <Button type="button" onClick={() => joinClick()}>
                회원가입
              </Button>
              <AuthLinks>
                <AuthLink onClick={handleIdFindClick}>아이디 찾기</AuthLink>
                <AuthLine></AuthLine>
                <AuthLink onClick={handlePwFindClick}>비밀번호 찾기</AuthLink>
              </AuthLinks>
              <KakaoButton type="button" onClick={() => loginHandler()}>
                <KakaoIcon src={kakaoIcon}></KakaoIcon>
                카카오 로그인
              </KakaoButton>
            </InputContainer>
          </LoginForm>
        </Container>
      </PageWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 93vh;
  overflow: hidden;
`;

// const ContainerArt = styled.div`
//   position: absolute;
//   z-index: -3;
//   background-color: rgb(0, 4, 7);
//   width: 100%;
//   height: 100%;
// `;

// const BackgroundOverlay = styled.div<{ src: any }>`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 80%;
//   height: 80%;
//   background-image: linear-gradient(
//       90deg,
//       rgba(0, 4, 7, 0.97) 1%,
//       rgba(0, 0, 0, 0),
//       rgba(0, 4, 7, 0.95) 99%
//     ),
//     url(${({ src }) => src});
//   background-size: repeat;
//   background-size: 100% 100%;
//   filter: blur(7px); /* Adjust the blur effect as needed */
//   z-index: -1;
// `;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(0, 4, 7, 0.72); */
  background-color: #000407;
  width: 100%;
  height: 100%;
`;

const SubContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
`;

const LoginForm = styled.form`
  background-color: #0e0e0e;
  border-radius: 38px;
  border: 1px solid #b09464;
  /* box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1); */
  width: 50vw;
  height: 58vh;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const TitleImg = styled.div<{ src: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16vw;
  height: 5.3vh;
  margin-bottom: 10px;
  background-repeat: repeat;
  background-size: 100% 100%;
  background-image: url(${({ src }) => src});
`;

const Title = styled.div`
  color: #b09464;
  font-size: 39px;
  font-weight: 700;
  line-height: 47.2px;
`;

const TitleKo = styled.div`
  color: #b09464;
  font-size: 25px;
  font-weight: 600;
  line-height: 30.26px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 35px;
  width: 100%;
`;

const Input = styled.input`
  width: 37%;
  height: 5.7vh;
  font-size: 1em;
  font-weight: 400;
  padding-left: 20px;
  color: #ffffff;
  margin-bottom: 10px;
  border: 1px solid #b09464;
  border-radius: 13px;
  background-color: #0e0e0e;
  outline: none;
  &::placeholder {
    color: #b09464;
    font-size: 1em;
    font-weight: 400;
  }
`;
const KakaoIcon = styled.img`
  position: absolute;
  left: 70px;
  width: 1.5vw;
  height: 3vh;
`;

const KakaoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #fae100;
  color: #000000;
  border: 1px solid #fae100;
  border-radius: 13px;
  width: calc(37% + 20px);
  height: 5.7vh;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  margin: 10px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(37% + 20px);
  height: 5.7vh;
  font-size: 1em;
  font-weight: 500;
  background-color: #b09464;
  color: #000000;
  border: 1px solid #b09464;
  border-radius: 13px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const AuthLinks = styled.div`
  display: flex;
  flex-direction: row;
  width: 37%;
  justify-content: center;
  align-items: center;
  margin: 12px 12px;
`;

const AuthLink = styled.a`
  color: #b09464;
  font-size: 1em;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const AuthLine = styled.div`
  display: flex;
  background-color: #b09464;
  width: 1px;
  height: 100%;
  margin: 0 27px 0 27px;
`;

export default LoginPage;
