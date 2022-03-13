import { Box } from "grommet";
import { IDisplayResponseProps } from "../definitions";

export const ArrayAnswerDisplay = (props: IDisplayResponseProps) => {
  let answer = props.message.output.value as any[];
  if (!Array.isArray(answer)) {
    answer = [answer];
  }
  return (
    <Box pad="small">
      {answer.map((a, i) => (
        <div key={i}>{a}</div>
      ))}
    </Box>
  );
};
