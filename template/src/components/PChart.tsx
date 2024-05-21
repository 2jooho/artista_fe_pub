import { PieChart } from "react-minimal-pie-chart";
import styled from "styled-components";

const PChart = ({ value, text }: any) => {
  return (
    <ChartDiv>
      <PieChart
        data={[
          {
            value: value,
            color: "#F6CB44",
            name: "name1",
          },
        ]}
        reveal={value} //퍼센트 치수
        lineWidth={18} //도넛 두께
        background="#c0c0c0"
        lengthAngle={360}
        rounded
        animate
        label={({ dataEntry }) => dataEntry.value + "%"}
        labelStyle={{
          fontSize: "1rem",
          fill: "#33333",
        }}
        labelPosition={0}
      />
      <TextDiv>{text}</TextDiv>
    </ChartDiv>
  );
};

const ChartDiv = styled.div`
  width: 13vw;
  height: 13vw;
  margin: 0 2.2vw 0 2.2vw;
`;

const TextDiv = styled.div`
  width: 10vw;
  font-size: 1vw;
  color: black;
  text-align: center;
  margin: 1.2vw 0 0 1.5vw;
`;
export default PChart;
