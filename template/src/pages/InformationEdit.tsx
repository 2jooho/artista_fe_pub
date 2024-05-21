import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  update,
  nickNameCheck,
  passAuthApi,
  passSuccessApi,
  passCheckApi,
} from "../api/auth/auth";
import { useSelector } from "react-redux";
import Datetime from "react-datetime";
import PasswordCheck from "../pages/PasswordCheck";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/modules/userData";
import { openModal, openCheckModal } from "../redux/modules/modalData";

const SignupPage: React.FC = () => {
  const user = useSelector((state: any) => {
    return state.user;
  });

  const [modalMsg, setModalMsg] = useState("다시 시도해주세요.");
  const handleModal = (content: string) => {
    dispatch(openModal(content));
  };
  const handleCheckModal = (checkContent: string) => {
    dispatch(openCheckModal(checkContent));
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    nickname: "",
    phoneNumber: "",
    email: "",
    birthdate: "",
    instaAddr: "",
    loginType: "",
  });

  // 유효성 검사
  const [isPassword, setIsPassword] = useState(true);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(true);
  const [isNickName, setIsNickName] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isAuth, setIsAuth] = useState(true);
  const [isInstaAddr, setIsInstaAddr] = useState(true);
  const [isBirth, setIsBirth] = useState(true);

  // 오류메세지 상태 저장
  const [passwordMessage, setPasswordMessage] = React.useState(" ");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    React.useState(" ");
  const [nickNameMessage, setNickNameMessage] = React.useState(" ");
  const [phoneMessage, setPhoneMessage] = React.useState(" ");
  const [emailMessage, setEmailMessage] = React.useState(" ");
  const [instaAddrMessage, setInstaAddrMessage] = React.useState(" ");
  const [birthMessage, setBirthMessage] = React.useState(" ");

  const [sEncData, setSEncData] = useState("");
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

  // 외부연동
  // axios
  // const { data: userInfo, refetch: userInfoRefetch } = useQuery(
  //   ["getUserInfo", user.userId],
  //   () => getUserInfo,
  //   {
  //     refetchOnWindowFocus: false,
  //     retry: false,
  //     enabled: false,
  //     onSuccess: (res: any) => {
  //       setNickNameMessage("사용 가능한 닉네임입니다.");
  //       setIsNickName(true);
  //     },
  //     onError: (error: any) => {
  //       if (error != null) {
  //         console.log(error);
  //       } else {
  //         alert("서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요.");
  //       }
  //     },
  //   }
  // );

  useEffect(() => {
    if (!user.userId && user.userId == null) {
      handleModal("로그인이 필요한 서비스입니다. \n 로그인 해주세요");
      navigate("/LoginPage");
      return;
    }

    // Parse URL parameters
    const params = new URLSearchParams(window.location.search);
    const dtoParam = params.get("dto");

    if (dtoParam) {
      const decodedDto = decodeURIComponent(dtoParam);
      console.log("decodedDto:" + decodedDto);
    }
  }, []);

  const dispatch = useDispatch();
  const setUpdate: any = async (data: any) => mutate(data);
  const { mutate } = useMutation(["update"], (data) => update(data), {
    retry: false,
    onSuccess: (res: any) => {
      dispatch(
        setUserData({
          userId: res?.data.userId,
          nickname: res?.data.nickname,
          instaId: res?.data.instaId,
        })
      );

      navigate("/");
    },
    // onError: (error: unknown) => errorHandler(error),
    onError: (error: unknown) => {
      if (error != null) {
        // alert(error);
        console.log(error);
      } else {
        handleModal(
          "서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요."
        );
      }
    },
  });

  const fetchNickNameCheck = async () => {
    const result = await nickNameCheck(formData.nickname);
    return result;
  };

  // 외부연동
  // axios
  const { data: isNickNameCheck, refetch: nickNameRefetch } = useQuery(
    ["isNickName", formData.nickname],
    fetchNickNameCheck,
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: false,
      onSuccess: (res: any) => {
        setNickNameMessage("사용 가능한 닉네임입니다.");
        handleModal("사용 가능한 닉네임입니다.");
        setIsNickName(true);
      },
      onError: (error: any) => {
        console.log("error?");
        if (error != null) {
          console.log(error);
          setNickNameMessage("중복된 닉네임입니다.");
          handleModal("중복된 닉네임입니다.");
        } else {
          handleModal(
            "서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요."
          );
        }
      },
    }
  );

  //닉네임 중복확인
  const handleNickDupBtn = () => {
    const idRegExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-z0-9|\s]{2,10}$/;
    if (!idRegExp.test(formData.nickname)) {
      setNickNameMessage("닉네임을 확인해주세요.");
      return;
    }
    nickNameRefetch();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPassword) {
      handleModal(passwordMessage);
      return;
    }
    if (!isPasswordConfirm) {
      handleModal(passwordConfirmMessage);
      return;
    }
    if (!isNickName) {
      handleModal(nickNameMessage);
      return;
    }
    if (!isAuth) {
      handleModal(phoneMessage);
      return;
    }
    if (!isEmail) {
      handleModal(emailMessage);
      return;
    }

    const birth = formData.birthdate.replaceAll("-", "");
    const phone = formData.phoneNumber.replaceAll("-", "");

    setUpdate({
      userId: formData.id,
      password: formData.password,
      nickName: formData.nickname,
      phone: phone,
      email: formData.email,
      birth: birth,
    });
  };

  //변경 감지
  const onChangeNickName = (e: any) => {
    const currentId = e.target.value;
    setFormData({ ...formData, nickname: currentId });
    const idRegExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-z0-9|\s]{2,10}$/;
    if (!idRegExp.test(currentId)) {
      setNickNameMessage(
        "닉네임은 2글자 이상 10글자 이하로 대소문자 또는 한글, 숫자만 입력해주세요."
      );
      setIsNickName(false);
    } else {
      setNickNameMessage("닉네임 중복체크 진행해주세요");
      setIsNickName(false);
    }
  };

  const onChangePassword = (e: any) => {
    const currentId = e.target.value;
    setFormData({ ...formData, password: currentId });
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    if (!passwordRegExp.test(currentId)) {
      setPasswordMessage(
        "비밀번호는 숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };

  const onChangePasswordConfirm = (e: any) => {
    const currentPasswordConfirm = e.target.value;
    setFormData({ ...formData, confirmPassword: e.target.value });
    if (formData.password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호와 비밀번호 확인이 다릅니다.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("");
      setIsPasswordConfirm(true);
    }
  };

  const onChangeEmail = (e: any) => {
    const currentEmail = e.target.value;
    setFormData({ ...formData, email: currentEmail });
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다.");
      setIsEmail(false);
    } else {
      setEmailMessage("");
      setIsEmail(true);
    }
  };

  const onChangeInstaAddr = (e: any) => {
    const currentInsta = e.target.value;
    setFormData({ ...formData, instaAddr: currentInsta });
    const idRegExp = /^[a-zA-z0-9_]{4,12}$/;
    if (!idRegExp.test(currentInsta)) {
      setInstaAddrMessage(
        "인스타그램 계정은 4-12사이 대소문자 또는 숫자, '_'만 가능합니다."
      );
      setIsInstaAddr(false);
    } else {
      setInstaAddrMessage("");
      setIsInstaAddr(true);
    }
  };

  const format = "YYYY-MM-DD";
  const getSeparator = () => {
    const regex = /[^0-9a-zA-Z]+/;
    const match = format.match(regex);

    if (match) {
      const symbol = match[0];
      const indexes = [];

      for (let i = 0; i < format.length; i++) {
        if (format[i] === symbol) {
          indexes.push(i);
        }
      }

      return { symbol, indexes };
    }
    return { symbol: undefined, indexes: [] };
  };

  const separator = getSeparator();

  const handleChangeDate = (e: any) => {
    let currentDate = e.target.value;

    if (separator.symbol && separator.indexes.length > 0) {
      separator.indexes.forEach((index) => {
        if (
          currentDate.length > index &&
          currentDate.slice(index, index + 1) != separator.symbol
        ) {
          currentDate =
            currentDate.slice(0, index) +
            separator.symbol +
            currentDate.slice(index);
        }
      });
    }

    setFormData({ ...formData, birthdate: currentDate });
    setIsBirth(true);
  };

  const [open, setOpen] = useState(false);
  const handleClickButton = () => {
    setOpen(!open);
  };

  const handleChangeCalendar = (selected: any) => {
    const formattedDate = selected.format(format);
    setFormData({ ...formData, birthdate: formattedDate });
    setIsBirth(true);
    setOpen(false);
  };

  const handleDelete = () => {
    navigate(`/UserDeleteCheck`);
  };

  const fetchData = async () => {
    return passAuthApi();
  };

  const fetchData2 = async () => {
    return passSuccessApi();
  };

  const { data: passAuth } = useQuery(["passAuth"], fetchData, {
    refetchOnWindowFocus: false,
    retry: false,
    enabled: false,
    onSuccess: (res: any) => {
      setSEncData(res.data);
    },
    onError: (error: unknown) => {
      if (error != null) {
        console.log(error);
      } else {
        handleModal(
          "서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요."
        );
      }
    },
  });

  const { data: passSuccess, refetch: passSuccessFetch } = useQuery(
    ["passSuccess", user.userId],
    fetchData2,
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: false,
      onSuccess: (res: any) => {
        console.log(res.data);
      },
      onError: (error: unknown) => {
        if (error != null) {
          console.log(error);
        } else {
          handleModal(
            "서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요."
          );
        }
      },
    }
  );

  const handleAuthBtn = async () => {
    fetchData();
    const { form }: any = document;
    if (sEncData && passAuth.data) {
      window.open(
        "",
        "popupChk",
        "width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, " +
          "status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no"
      );
      form.action = "";
      form.target = "popupChk";
      form.submit();
    }
  };

  const fnPassCheck = async (data: any) => {
    passCheck(data);
  };
  //비밀번호 체크
  const { mutate: passCheck } = useMutation(
    ["passCheck", user.userId],
    (data) => passCheckApi(data),
    {
      retry: false,
      onSuccess: (res: any) => {
        let birth = res.data.birth;
        birth =
          birth.slice(0, 4) +
          separator.symbol +
          birth.slice(4, 6) +
          separator.symbol +
          birth.slice(6);

        setFormData({
          ...formData,
          name: res.data.name,
          phoneNumber: res.data.phone,
          email: res.data.email,
          birthdate: birth,
          nickname: user.nickname,
          instaAddr: user.instaId,
        });
        setIsPasswordCheck(true);
      },
      onError: (error: unknown) => {
        if (error != null) {
          console.log(error);
          handleModal("비밀번호가 틀립니다.");
        } else {
          handleModal(
            "서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요."
          );
        }
      },
    }
  );

  return (
    <Wrapper>
      {!isPasswordCheck ? (
        <PasswordCheck fnPassCheck={fnPassCheck}></PasswordCheck>
      ) : (
        <PageWrapper>
          <SignupForm onSubmit={handleSubmit}>
            <SignupContainer>
              <Title>개인정보 수정</Title>
              <Section>
                <Label>아이디</Label>
                <InputContainer type="id">
                  <Input
                    type="text"
                    maxLength={20}
                    value={user.userId}
                    readOnly
                  />
                </InputContainer>
              </Section>
              <Section>
                <Label>비밀번호</Label>
                <InputContainer type="password">
                  <Input
                    type="password"
                    value={formData.password}
                    placeholder="비밀번호를 입력해주세요. (영문/숫자/특수문자 허용, 두 개 이상 조합)"
                    onChange={onChangePassword}
                  />
                </InputContainer>
              </Section>
              <ValidationMsgContainer colorType={isPassword}>
                {passwordMessage}
              </ValidationMsgContainer>
              <Section>
                <Label>비밀번호 확인</Label>
                <InputContainer type="password">
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    placeholder="비밀번호를 한 번 더 입력해주세요."
                    onChange={onChangePasswordConfirm}
                  />
                </InputContainer>
              </Section>
              <ValidationMsgContainer colorType={isPasswordConfirm}>
                {passwordConfirmMessage}
              </ValidationMsgContainer>
              <Section>
                <Label>이름</Label>
                <InputContainer type="name">
                  <Input
                    type="text"
                    maxLength={10}
                    value={formData.name}
                    readOnly
                  />
                </InputContainer>
              </Section>
              <Section>
                <Label>본인 인증</Label>
                <InputContainer type="phone">
                  <Input
                    type="text"
                    maxLength={12}
                    placeholder="본인인증을 진행해주세요."
                    id="phone"
                    value={formData.phoneNumber}
                    disabled
                  />
                  <DuplicateButton type="button" onClick={handleAuthBtn}>
                    인증
                  </DuplicateButton>
                  <form name="form" id="form" method="post" action="">
                    <input
                      type="hidden"
                      name="m"
                      value="checkplusService"
                    ></input>
                    <input
                      type="hidden"
                      name="EncodeData"
                      value={sEncData}
                    ></input>
                  </form>
                </InputContainer>
              </Section>
              <Section>
                <Label>닉네임</Label>
                <InputContainer type="nickname">
                  <Input
                    type="text"
                    maxLength={10}
                    value={formData.nickname}
                    placeholder="작가명을 입력해주세요."
                    onChange={onChangeNickName}
                  />
                  <DuplicateButton type="button" onClick={handleNickDupBtn}>
                    중복확인
                  </DuplicateButton>
                </InputContainer>
              </Section>
              <ValidationMsgContainer colorType={isNickName}>
                {nickNameMessage}
              </ValidationMsgContainer>
              <Section>
                <Label>이메일</Label>
                <InputContainer type="email">
                  <Input
                    type="email"
                    value={formData.email}
                    placeholder="이메일을 입력해주세요. (예 : artista@artista.com)"
                    onChange={onChangeEmail}
                  />
                </InputContainer>
              </Section>
              <ValidationMsgContainer colorType={isEmail}>
                {emailMessage}
              </ValidationMsgContainer>
              <Section>
                <Label>SNS 계정 (인스타그램)</Label>
                <InputContainer type="sns">
                  <Input
                    type="instaAddr"
                    value={formData.instaAddr}
                    placeholder="SNS 계정을 입력해주세요. (예 : @artista)"
                    onChange={onChangeInstaAddr}
                  />
                </InputContainer>
              </Section>
              <ValidationMsgContainer colorType={isInstaAddr}>
                {instaAddrMessage}
              </ValidationMsgContainer>
              <Section>
                <Label>생년월일</Label>
                <InputContainer type="birth">
                  <Input
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={formData.birthdate}
                    id="birth"
                    onChange={handleChangeDate}
                  />
                  <DateBtn type="button" onClick={handleClickButton}></DateBtn>
                </InputContainer>
                {open && (
                  <Datetime
                    input={false}
                    timeFormat={false}
                    dateFormat={format}
                    value={formData.birthdate}
                    onChange={handleChangeCalendar}
                  />
                )}
              </Section>
              <ValidationMsgContainer colorType={isBirth}>
                {birthMessage}
              </ValidationMsgContainer>
              <br></br>
              <Button type="submit">완료</Button>
              <UserDeleteContainer>
                <UserDeleteSpan onClick={handleDelete}>
                  회원탈퇴
                  <Line></Line>
                </UserDeleteSpan>
              </UserDeleteContainer>
            </SignupContainer>
          </SignupForm>
        </PageWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #000407;
  overflow: hidden;
`;

const SignupForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #0e0e0e;
  width: 100%;
  height: 100%;
`;

const SignupContainer = styled.div`
  width: 50vw;
  padding: 40px;
  background-color: #0e0e0e;
  border: 1px solid #b09464;
  border-radius: 38px;
  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); */
  margin-top: 12vh;
  margin-bottom: 12vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: #b09464;
  font-size: 2em;
  font-weight: 600;
  margin-top: 3vh;
  margin-bottom: 3vh;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 65%;
`;

const Label = styled.label`
  display: flex;
  align-self: flex-start;
  font-size: 1em;
  font-weight: 500;
  margin-bottom: 6px;
  color: #b09464;

  @media (max-width: 700px) {
    padding-left: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  height: 5.7vh;
  font-size: 1em;
  font-weight: 400;
  padding-left: 2vh;
  color: #b09464;
  outline: none;

  &::placeholder {
    color: #747474;
    font-size: 0.8em;
    font-weight: 400;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

interface InputProps {
  type: string;
}
const InputContainer = styled.div<InputProps>`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: auto;
  border: 1px solid #b09464;
  border-radius: 13px;
  background-color: #0e0e0e;

  /* ${(props) =>
    props.type === "name" &&
    css`
      width: 87%;
      align-self: flex-start;
    `} */
`;

const DuplicateButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 7px;
  width: 5vw;
  height: 65%;
  color: #b09464;
  background-color: #0e0e0e;
  border-radius: 8px;
  border: 1px solid #b09464;
  font-size: 0.8em;
  font-weight: 400;
  cursor: pointer;
`;

interface ValidationProps {
  colorType: any;
}

const ValidationMsgContainer = styled.div<ValidationProps>`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 65%;
  font-size: 0.8em;
  margin-bottom: 3px;
  font-weight: 400;
  color: ${(props) => (props.colorType ? "#ffffff" : "#ff4633")};
`;

const Button = styled.button`
  width: 65%;
  height: 5.7vh;
  font-size: 1em;
  font-weight: 500;
  background-color: #b09464;
  color: #000000;
  border: 1px solid #b09464;
  border-radius: 13px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin: 10px 0 40px 0;
`;

const UserDeleteContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 3vh 0 3vh 4vh;

  /* padding-top: 10px;
  margin-left: 30px; */
`;

const UserDeleteSpan = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1em;
  font-weight: 400;
  line-height: 26px;
  color: #747474;
  cursor: pointer;
`;

const Line = styled.div`
  display: flex;
  width: 55px;
  height: 1px;
  background-color: #747474;
`;

const DateBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5%;
  height: 2.5vh;
  margin-right: 1.5%;
  background-color: #b09464;
  border: none;
`;

export default SignupPage;
