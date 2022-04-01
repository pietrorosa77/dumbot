import { Box } from "grommet";
import styled, { keyframes } from "styled-components";

const loading = keyframes`
  0% { opacity: .2; }
  20% { opacity: 1; }
  100% { opacity: .2; }
`;

const LoadingStep = styled.div<{ delay: string; bgColor?: string }>`
  animation: ${loading} 1.4s infinite both;
  animation-delay: ${(props) => props.delay};
  height: 20px;
  width: 20px;
  background-color: ${(props) => props.bgColor || "#000"};
  border-radius: 50%;
`;

export const LoadingMessage = (props: {
  height?: string;
  justify?: "end" | "start" | "center";
  bgColor?: string;
}) => (
  <Box
    className="dumbot-loading"
    direction="row"
    gap="small"
    justify={props.justify || "center"}
    height={props.height || "50px"}
    align="end"
  >
    <LoadingStep delay="0s" bgColor={props.bgColor}></LoadingStep>
    <LoadingStep delay=".2s" bgColor={props.bgColor}></LoadingStep>
    <LoadingStep delay=".4s" bgColor={props.bgColor}></LoadingStep>
  </Box>
);
