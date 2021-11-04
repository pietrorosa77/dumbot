import { Box } from "grommet";
import React from "react";
import styled, { keyframes, ThemeContext } from "styled-components";

const loading = keyframes`
  0% { opacity: .2; }
  20% { opacity: 1; }
  100% { opacity: .2; }
`;

const spinning = (color: string, size?: number) => (
  <svg
    version="1.1"
    viewBox="0 0 32 32"
    width={`${size || 36}px`}
    height={`${size || 36}px`}
    fill={color}
  >
    <path
      opacity=".25"
      d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
    />
    <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 16 16"
        to="360 16 16"
        dur="0.8s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

const LoadingStep = styled.span<{ delay: string }>`
  animation: ${loading} 1.4s infinite both;
  animation-delay: ${(props) => props.delay};
`;

const CenteredDiv = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50pt;
`;

export const LoadingMessage = () => (
  <span className="dumbot-loading">
    <LoadingStep delay="0s">.</LoadingStep>
    <LoadingStep delay=".2s">.</LoadingStep>
    <LoadingStep delay=".4s">.</LoadingStep>
  </span>
);

export const BotSpinner = (props: { themeColor: string; size?: number }) => {
  const theme: any = React.useContext(ThemeContext);
  return (
    <Box align="center" justify="center">
      {spinning(theme.global.colors[props.themeColor], props.size)}
    </Box>
  );
};

export const CenteredBotSpinner = (props: {
  themeColor?: string;
  size?: number;
}) => (
  <CenteredDiv>
    <BotSpinner themeColor={props.themeColor || "brand"} size={props.size} />
  </CenteredDiv>
);
