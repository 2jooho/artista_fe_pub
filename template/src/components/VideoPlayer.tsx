// VideoPlayer.tsx
import React from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { heightPercentage, widthPercentage } from "../constants/ResponsiveSize";

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  return (
    <VideoContainer>
      <ReactPlayer
        url={videoUrl}
        muted={true}
        controls={false}
        loop={true}
        playing={true}
        className="react-player"
        width={"100%"}
        height={"100%"}
      ></ReactPlayer>
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  width: ${widthPercentage(1692)}%;
  height: ${heightPercentage(468)}%;
  .react-player {
  }
`;

export default VideoPlayer;
