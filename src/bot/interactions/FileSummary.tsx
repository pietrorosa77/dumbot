import { Anchor, Box } from "grommet";
import { Attachment } from "grommet-icons";

export const FileSummary = (props: {
  files: {
    url: string;
    name: string;
    mime: string;
  }[];
}) => {
  return (
    <Box pad="small" gap="small" fill>
      {props.files.map((f, i) => {
        <Anchor
          key={`${f.url}-${i}`}
          icon={<Attachment />}
          label={f.name}
          href={f.url}
        />;
      })}
    </Box>
  );
};
