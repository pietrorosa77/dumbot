import { Box } from "grommet";
import { IDisplayResponseProps } from "../definitions";

export const ArrayAnswerDisplay = (props: IDisplayResponseProps) => {
  let answer = props.message.output.value as any[];
  if (!Array.isArray(answer)) {
    answer = [answer];
  }
  return (
    <Box pad="small">
      <pre>{answer.join(",\n")}</pre>
    </Box>
  );
};
