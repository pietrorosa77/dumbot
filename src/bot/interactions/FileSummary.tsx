import { Box } from "grommet";

export const FileSummary = (props: { files: any }) => {
  return (
    <Box align="center" justify="start" pad="none" fill>
      sho files here {props.files}
    </Box>
  );
};
