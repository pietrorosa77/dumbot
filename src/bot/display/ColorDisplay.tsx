import { Box } from "grommet";
import { IDisplayResponseProps } from "../definitions";

export const ColorAnswerDisplay = (props: IDisplayResponseProps) => {
  const answer = props.message.output.value;

  return (
    <Box pad="small">
      <Box background={answer} width="50px" height="50px" round="medium" />
    </Box>
  );
};
