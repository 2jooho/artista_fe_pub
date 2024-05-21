import React, {
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";
import ImageCard from "./ImageCard";
import TransverseImage from "./TransverseImage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { galleryList } from "../api/gallery/gallery";
import { Link } from "react-router-dom";
import { collaboList } from "../api/collabo/collabo";
import { widthPercentage } from "../constants/ResponsiveSize";
import delaybar from "../assets/icons/use/delaybar.gif";

interface InfiniteScrollProps {
  type: string;
  categoryId: string;
  orderType: string;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  type,
  categoryId,
  orderType,
}) => {
  const s3Url = process.env.REACT_APP_CLOUDFRONT_IMG_URL;
  const queryClient = useQueryClient();
  const defaultSize = 8;
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(defaultSize);
  const [axiosData, setAxiosData] = useState<any[]>([]);
  // const isLastIssue = true;
  const [isLastIssue, setIsLastIssue] = useState(true);
  const [dynamicHeight, setDynamicHeight] = useState("100");

  const loadMoreImages = () => {
    setPage((prev) => prev + 1);
    setLoading(true);
    setTimeout(() => {
      fetchData();
    }, 2000);
    setLoading(false);
  };

  const handleChangeValue = (res: any) => {
    if (res.data) {
      let data;
      if (type === "gallery") {
        data = res?.data.artListDtoList;
        setAxiosData([...axiosData, ...res?.data.artListDtoList]);
      } else {
        data = res?.data.collaborInfoDtoList;
        setAxiosData([...axiosData, ...res?.data.collaborInfoDtoList]);
      }

      if (page > 0 && data.length > 0) {
        setDynamicHeight("auto");
        console.log(page + "/" + dynamicHeight + "/" + data.length);
      }

      if (page <= 0) {
        if (data && data.length <= defaultSize / 2) {
          setDynamicHeight("50");
        } else {
          setDynamicHeight("100");
        }
      }
    }
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
  }, [loading, axiosData]);

  useEffect(() => {
    setPage(0);
    queryClient.clear();
    setAxiosData([]);
    fetchData();
  }, [categoryId, orderType]);

  const fetchData = async () => {
    if (type === "gallery") {
      return galleryList(page, size, "", categoryId, orderType, "G");
    } else {
      return collaboList(page, size);
    }
  };

  // 외부연동
  // axios
  const { data: fetchDataList, isLoading } = useQuery(
    ["infiniteFetchList", page, type],
    fetchData,
    {
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: (res: any) => {
        handleChangeValue(res);
      },
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

  return (
    <Container dynamicHeight={dynamicHeight}>
      {/* <TopDiv>
        
            <ImageDate>콜라보 작품</ImageDate>
          </TopDiv>
          <CollarborImageGrid>
            {axiosData && axiosData.map((artList:any, index: any) => (
              <TransverseImage
                key={index}
                imageUrl={artList?.artUrl}
                text={artList?.artName}
              ></TransverseImage>
            ))}
          </CollarborImageGrid> */}

      <ImageGrid>
        {axiosData &&
          axiosData.map((artList: any, index: any) =>
            type === "gallery" ? (
              <>
                <Link to={`/GalleryDetail/${artList?.artId}`} key={index}>
                  <ImageCard
                    key={index}
                    imageUrl={s3Url + artList?.artUrl}
                    artName={artList?.artName}
                    artistName={artList?.artistName}
                  />
                </Link>
              </>
            ) : (
              <>
                <ImageCard
                  key={index}
                  imageUrl={artList?.artUrl}
                  artName={artList?.artName}
                  artistName={"ARTISTA"}
                />
              </>
            )
          )}
      </ImageGrid>
      {(loading || isLoading) && (
        <RefDiv loading={!loading}>
          <LoadingImg src={delaybar}></LoadingImg>
        </RefDiv>
      )}
      {(!loading || !isLoading) && (
        <RefDiv loading={!loading} ref={loaderRef}></RefDiv>
      )}
    </Container>
  );
};

const Container = styled.div<{ dynamicHeight: any }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  /* margin: 100px 0 0; */
  width: 70%;
  /* height: 100vh; */
  height: ${(props) =>
    props.dynamicHeight === "auto"
      ? "auto"
      : props.dynamicHeight === "100"
      ? "100vh"
      : "50vh"};
  padding: ${(props) =>
    props.dynamicHeight === "auto" ? "120px 0 120px 0" : "0px"};
`;

const TopDiv = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
`;

const ImageGrid = styled.div`
  /* display: flex; */
  display: grid;
  grid-template-columns: repeat(4, 1fr); //repeat(반복횟수, 반복값)
  /* flex-wrap: wrap; */
  gap: 60px;
  width: 100%;
  /* margin: 100px 0 100px 0; */
`;

const CollarborImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-self: center;
  width: 100%;
  gap: 30px;
`;

const LogoBk = styled.img`
  width: 50px;
  height: auto;
`;

const ImageDate = styled.div`
  width: auto;
  height: auto;
  font-size: 2.5rem;
  color: #010101;
`;

const RefDiv = styled.div<{ loading: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: ${(props) => (!props.loading ? "none" : "absolute")};
  width: 100%;
  bottom: 0%;
  height: ${(props) => (!props.loading ? "20vh" : "10px")};
`;

const LoadingImg = styled.img`
  display: flex;
  width: 30%;
  height: 30%;
  object-fit: contain;
`;

export default InfiniteScroll;
