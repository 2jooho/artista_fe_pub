import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import serchArt from "../assets/img/serch/serchBack.jpg";
import { heightPercentage, widthPercentage } from "../constants/ResponsiveSize";
import CheckSelectCustom from "../components/CheckSelectCustom";
import { getSerchCategoryList } from "../mock/main_data";
import { useQuery } from "@tanstack/react-query";
import { serch } from "../api/serch/serch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import background from "../assets/img/background-gall.jpg";
import delaybar from "../assets/icons/use/delaybar.gif";

const Search = () => {
  const navigate = useNavigate();
  const s3Url = process.env.REACT_APP_S3_IMG_URL;
  const queryClient = new QueryClient();
  const categoryList = getSerchCategoryList();
  const [serchType, setSerchType] = useState<string>("S"); //S:전체, C:카테고리, AT:작가명, A:작품명
  const [serchValue, setSerchValue] = useState<string>("");
  const defaultSize = 8;
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(defaultSize);
  const [dataType, setDataType] = useState("D"); //default: D, serch: S, noSerch: N
  const [queryEnabled, setQueryEnabled] = useState(false);
  const [axiosData, setAxiosData] = useState<any[]>([]);

  const loadMoreImages = () => {
    setLoading(true);
    setQueryEnabled(true);
    setPage((prev) => prev + 1);
    setTimeout(() => {
      fetchData();
    }, 2000);
    setLoading(false);
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        const dataLength = axiosData.length;
        const isLastReq = dataLength !== (page + 1) * size ? true : false;

        if (firstEntry.isIntersecting && !loading && !isLastReq) {
          loadMoreImages();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.current.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.current?.unobserve(loaderRef.current);
      }
    };
  }, [loading, serchValue, axiosData]);

  const handleChangeValue = (res: any) => {
    setAxiosData([...axiosData, ...res?.data.artListDtoList]);
    if (axiosData.length === 0 && res?.data.artListDtoList.length === 0) {
      setDataType("N");
    } else {
      setDataType("S");
    }
    setQueryEnabled(false);
  };

  const fetchData = async () => {
    return serch(serchType, serchValue, page, size);
  };

  const { data: fetchDataList } = useQuery(
    ["serch", serchValue, page],
    fetchData,
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: queryEnabled,
      onSuccess: (res: any) => {
        handleChangeValue(res);
      },
      // onError: (error: unknown) => errorHandler(error),
      onError: (error: unknown) => {
        if (error != null) {
          // alert(error);
          console.log(error);
        } else {
          alert("서비스 접속이 원활하지 않습니다. 잠시 후 다시 이용해주세요.");
        }
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (serchValue.length < 2) {
      alert("2자리 이상 입력해주세요!");
      return;
    }
    setQueryEnabled(true);
    fetchData();
  };

  const onChangeSerch = (e: any) => {
    setSerchValue(e);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      setAxiosData([]);
      setPage(0);
      handleSubmit(e);
    }
  };

  const handleSerch = (e: any) => {
    setAxiosData([]);
    setPage(0);
    if (serchValue.length < 2) {
      alert("2자리 이상 입력해주세요!");
      return;
    }
    setQueryEnabled(true);
    fetchData();
  };

  const handelArtClick = (artId: any) => {
    navigate(`/GalleryDetail/${artId}`);
  };

  return (
    <>
      <TopPageWrapper src={background}>
        {/* <ContainerArt></ContainerArt> */}
        {/* <BackgroundOverlay src={`${serchArt}`}></BackgroundOverlay> */}
        <SearchContainer>
          {/* <SerchTitle>검색</SerchTitle> */}
          <SerchBarContainer>
            {/* 검색input */}
            {/* <InputSerch> */}
            <SerchForm onSubmit={handleSubmit}>
              {/* 카테고리 선택 */}
              <CategoryContiner>
                <CheckSelectCustom
                  categoryList={categoryList}
                  type="serch"
                  setSerchType={setSerchType}
                ></CheckSelectCustom>
                <CategoryLine></CategoryLine>
              </CategoryContiner>
              <Input
                type="text"
                value={serchValue}
                onChange={(e: any) => onChangeSerch(e.target.value)}
                onKeyPress={handleKeyPress}
              ></Input>
              <CategoryLine></CategoryLine>
              <SerchButton type="submit" onClick={handleSerch}>
                검색
              </SerchButton>
            </SerchForm>
            {/* </InputSerch> */}
          </SerchBarContainer>
          <SerchSubTitle>
            {dataType === "N"
              ? "검색 결과가 없습니다."
              : axiosData.length > 0
              ? "검색 결과가 (" + axiosData.length + ")건 있습니다."
              : ""}
          </SerchSubTitle>
        </SearchContainer>
      </TopPageWrapper>

      <LowPageWrapper show={dataType}>
        <Container>
          <ImageGrid>
            {axiosData &&
              axiosData?.map((artList: any, index: any) => (
                <BoxContainer>
                  <ImageContainer>
                    <ImageCard
                      key={artList?.artId}
                      src={s3Url + artList?.artUrl}
                      onClick={() => handelArtClick(artList?.artId)}
                    />
                  </ImageContainer>
                  <ArtInfoContainer>
                    <ArtistTitle key={index}>{artList?.artistName}</ArtistTitle>
                    <ArtTitle key={index}>{artList?.artName}</ArtTitle>
                  </ArtInfoContainer>
                </BoxContainer>
              ))}
          </ImageGrid>
          {loading && (
        <RefDiv loading={!loading}>
          <LoadingImg src={delaybar}></LoadingImg>
        </RefDiv>
      )}
      {!loading && <RefDiv loading={!loading} ref={loaderRef}></RefDiv>}
        </Container>
      </LowPageWrapper>
    </>
  );
};

const TopPageWrapper = styled.div<{ src: any }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 93vh;
  overflow: hidden;
  background-image: url(${({ src }) => src});
  background-size: repeat;
  background-size: 100% 100%;
`;

const ContainerArt = styled.div`
  position: absolute;
  z-index: -3;
  background-color: rgb(0, 4, 7);
  width: 100%;
  height: 100%;
`;

const BackgroundOverlay = styled.div<{ src: any }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background-image: linear-gradient(
      90deg,
      rgba(0, 4, 7, 0.97) 1%,
      rgba(0, 0, 0, 0),
      rgba(0, 4, 7, 0.95) 99%
    ),
    url(${({ src }) => src});
  background-size: repeat;
  background-size: 100% 100%;
  filter: blur(7px); /* Adjust the blur effect as needed */
  z-index: -1;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(0, 4, 7, 0.72); */
  width: 100%;
  height: 100%;
`;

const SerchTitle = styled.div`
  display: flex;
  font-size: 2.8em;
  font-weight: 500;
  line-height: 66.01px;
  color: #ffffff;
  margin: -160px 0 60px 0;
`;
const SerchBarContainer = styled.div`
  display: flex;
  background-color: rgba(0, 4, 7, 0.7);
  border: 1px solid #b09464;
  width: 60%;
  height: 7.9%;
`;
const InputSerch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CategoryContiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10vw;
  height: 100%;
  border: none;
`;

const SerchSubTitle = styled.div`
  display: flex;
  color: #b09464;
  font-size: 1.2em;
  font-weight: 400;
  position: absolute;
  top: 75%;
`;

interface LowProps {
  show: any;
}

const LowPageWrapper = styled.div<LowProps>`
  display: ${({ show }) => (show === "S" ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background-color: #000407;
  width: 100%;
  height: auto;
`;

const SerchForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  display: flex;
  width: 100%;
  height: auto;
  background-color: transparent;
  font-size: 1.2em;
  font-weight: 400;
  line-height: 34.81px;
  color: #b09464;
  border: none;
  margin: 20px;
  text-align: center;
  outline: none;
`;

const SerchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10vw;
  height: 100%;
  /* border-radius: 0 21px 21px 0; */
  background-color: transparent;
  color: #b09464;
  font-size: 1.2em;
  font-weight: 400;
  border: none;
  cursor: pointer;
`;

const CategoryLine = styled.div`
  width: 1px;
  height: 70%;
  background-color: #b09464;
  display: flex;
  align-self: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 60px 0 60px 0;
`;

const ImageGrid = styled.div`
  display: grid;
  //repeat(반복횟수, 반복값)
  /* grid-template-columns: repeat(
    auto-fill,
    minmax(${widthPercentage(400)}vw, 1fr)
  );  */
  grid-template-columns: repeat(4, 1fr);
  column-gap: 60px;
  row-gap: 30px;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 26vh;
  display: flex;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const ImageCard = styled.img`
  width: 100%;
  height: 100%;
`;

const ArtInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  /* background-color: aqua; */
`;

const ArtistTitle = styled.div`
  display: flex;
  font-size: 1.2em;
  font-weight: 600;
  color: #ffffff;
`;

const ArtTitle = styled.div`
  display: flex;
  font-size: 1.2em;
  font-weight: 400;
  color: #ffffff;
`;

const BasicTitle = styled.div`
  display: flex;
  font-size: 26px;
  line-height: 41.15px;
  font-weight: 700;
  color: #dfd6a6;
  margin: 10px 0 0 10px;
`;

const RefDiv = styled.div<{ loading: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(props) => (!props.loading ? "20vh" : "10px")};
`;

const LoadingImg = styled.img`
  display: flex;
  width: 30%;
  height: 30%;
  object-fit: contain;
`;

export default Search;
