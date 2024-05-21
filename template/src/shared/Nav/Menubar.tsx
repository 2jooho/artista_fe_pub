import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { Link, Outlet } from "react-router-dom";
import MenuSelectItem from "../../components/MenuSelectItem";
import logo from "../../assets/img/main/logo.png";
import menu from "../../assets/icons/use/01menu.png";
import top from "../../assets/icons/use/14way-north.png";
import low from "../../assets/icons/use/16way-south.png";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../../redux/modules/userData";
import ValidationModal from "../../components/ValidationModal";
import CheckModal from "../../components/CheckModal";

const Menubar = () => {
  const dispatch = useDispatch();
  const [isShowOptions, setShowOptions] = useState(false);
  const dropMenuRef = useRef<HTMLDivElement | null>(null);
  const isLogin = useSelector((state: any) => {
    return state.user.userId !== null ? false : true;
  });
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    // 스크롤 이벤트를 감지하여 메뉴 바의 가시성을 업데이트
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0 && !menuVisible) {
        setMenuVisible(true);
      } else if (scrollY === 0 && menuVisible) {
        setMenuVisible(false);
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuVisible]);

  const visibleButton: any = () => {
    setMenuVisible(false);
  };

  const scrollTo = (location: any) => {
    const duration = 500; // 애니메이션 지속 시간 (밀리초)

    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const startTime = performance.now();
    const startY = window.pageYOffset;
    const distance =
      location === "top"
        ? -startY
        : document.body.scrollHeight - startY - window.innerHeight;

    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const scroll = easeInOutQuad(elapsedTime / duration);

      if (location === "top") {
        window.scrollTo(0, startY + distance * scroll - 1);
      } else {
        window.scrollTo(0, startY + distance * scroll);
      }

      if (elapsedTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  // window.addEventListener("beforeunload", () => {
  //   dispatch(removeUserData());
  // });

  const handleLogOut: any = () => {
    dispatch(removeUserData());
    alert("로그아웃 되었습니다.");
  };

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      // useRef current에 담긴 엘리먼트 바깥을 클릭 시 드롭메뉴 닫힘
      if (
        isShowOptions &&
        dropMenuRef.current &&
        !dropMenuRef.current.contains(e.target)
      )
        setShowOptions(false);
    };
    document.addEventListener("click", handleOutsideClose);

    return () => document.removeEventListener("click", handleOutsideClose);
  }, [isShowOptions]);

  if (
    window.location.pathname === "/PassSuccess/callback" ||
    window.location.pathname === "/aa/KAKAO/callback"
  ) {
    return (
      <OutletContainer hidden={menuVisible}>
        <Outlet />
      </OutletContainer>
    );
  }

  return (
    <Container>
      <VisibleButton
        onClick={visibleButton}
        hidden={menuVisible}
        src={menu}
        mode={"menu"}
      ></VisibleButton>
      <RigthButton
        onClick={() => scrollTo("top")}
        hidden={menuVisible}
        src={top}
        mode={"top"}
      ></RigthButton>
      <RigthButton
        onClick={() => scrollTo("low")}
        hidden={menuVisible}
        src={low}
        mode={"Low"}
      ></RigthButton>

      <Wrapper hidden={menuVisible}>
        {/* 좌측 메뉴 */}
        <MenuView>
          <Link to="/About" style={{ textDecoration: "none" }}>
            <MenuItem>ABOUT</MenuItem>
          </Link>

          <Link to="/Gallery" style={{ textDecoration: "none" }}>
            <MenuItem>GALLERY</MenuItem>
          </Link>

          <Link to="/Star" style={{ textDecoration: "none" }}>
            <MenuItem>STAR</MenuItem>
          </Link>

          <Link to="/Collabor" style={{ textDecoration: "none" }}>
            <MenuItem>COLLAB</MenuItem>
          </Link>

          {/* <Link to="/Contact" style={{ textDecoration: "none" }}>
            <MenuItem>CONTACT</MenuItem>
          </Link> */}
        </MenuView>

        {/* 메인로고 */}
        <Link to="/">
          <Logo src={`${logo}`} />
        </Link>

        {/* 우측 메뉴 */}
        <RightMenuView ref={dropMenuRef}>
          <Link
            to="/Search"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>SEARCH</MenuItem>
          </Link>
          <MenuSelectItem
            isLogin={isLogin}
            handleLogOut={handleLogOut}
            isShowOptions={isShowOptions}
            setShowOptions={setShowOptions}
          ></MenuSelectItem>
          <Link
            to="https://aiblades.imweb.me/"
            style={{ textDecoration: "none" }}
          >
            <MenuItem>SHOP</MenuItem>
          </Link>
        </RightMenuView>
      </Wrapper>

      <OutletContainer hidden={menuVisible}>
        <Outlet />
      </OutletContainer>
      {/* 모달 */}
      <ValidationModal />
      <CheckModal></CheckModal>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

interface HiddenProps {
  hidden: boolean;
}

const Wrapper = styled.div<HiddenProps>`
  width: 100%;
  height: 7%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0e0e0e;
  border-bottom: 1px solid #b09464;
  position: fixed;
  z-index: 10000;

  ${(props) =>
    props.hidden &&
    css`
      transform: translateY(-100%);
      transition: transform 0.3s ease-in-out;
    `}
`;

interface ButtonProps {
  hidden: boolean;
  src: any;
  mode: any;
}

const VisibleButton = styled.div<ButtonProps>`
  display: flex;
  position: absolute;
  width: 30px;
  height: 30px;
  position: fixed;
  z-index: 10000;
  background-color: transparent;
  transform: translateX(100%);
  cursor: pointer;
  background-image: url(${({ src }) => src});
  background-size: repeat;
  background-size: 100% 100%;
  /* top: ${(props) => (props.mode === "menu" ? "70%" : "80%")}; */
  top: 83%;
  right: 0%;

  ${(props) =>
    props.hidden &&
    css`
      right: 0.5%;
      transform: translateX(0%);
      transition: transform 1s ease-in;
    `}
`;

const RigthButton = styled.div<ButtonProps>`
  display: flex;
  position: absolute;
  width: 30px;
  height: 30px;
  position: fixed;
  z-index: 10000;
  background-color: transparent;
  /* transform: translateX(100%); */
  cursor: pointer;
  background-image: url(${({ src }) => src});
  background-size: repeat;
  background-size: 100% 100%;
  top: ${(props) => (props.mode === "top" ? "89%" : "95%")};
  right: 0.5%;

  /* ${(props) =>
    props.hidden &&
    css`
      transform: translateX(0%);
      transition: transform 1s ease-in;
    `} */
`;

const Logo = styled.img<{ src: any }>`
  width: 150px;
  height: auto;
  display: flex;
  @media (max-width: 1200px) {
    width: 180px;
    margin-left: 100px;
  }
  @media (max-width: 900px) {
    width: 80px;
    margin-left: 100px;
  }
`;

const MenuView = styled.div`
  flex-direction: row;
  display: flex;
  /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); */
  gap: 22px;
  margin-left: 40px;
  position: absolute;
  left: 0;
`;

const MenuItem = styled.div`
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

const MenuItemShop = styled.div`
  padding: 0.2vw;
  font-size: 0.8em;
  font-weight: 500;
  color: #b09464;

  cursor: pointer;
  &:hover {
    /* color: #ff4633; */
    color: #b09464;
  }
  @media (max-width: 1200px) {
    font-size: 15px;
  }
  @media (max-width: 700px) {
    font-size: 7px;
  }
`;

const RightMenuView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  gap: 22px;
  margin-right: 20px;
  position: absolute;
`;

const OutletContainer = styled.div<HiddenProps>`
  display: flex;
  flex-direction: column;
  margin-top: 7vh;

  ${(props) =>
    props.hidden &&
    css`
      margin-top: 0px;
      transition: margin-top 0.3s ease-in-out;
    `}
`;

export default Menubar;
