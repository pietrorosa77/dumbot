import { Box, FileInput, Keyboard } from "grommet";
import React from "react";
import { IInputComponentProps } from "../../definitions";

export const BotFileInput = (props: IInputComponentProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files as FileList;
    props.onChange(fileList);
  };

  const onSubmit = () => {
    props.onSubmit();
  };

  return (
    <Keyboard target="component" onEnter={onSubmit}>
      <Box align="center" justify="start" pad="large">
        <Box width="medium">
          <FileInput
            multiple={{
              max: 5,
            }}
            value={props.value}
            onChange={onChange}
            onFocus={() => props.onFocus(true)}
            onBlur={() => props.onFocus(false)}
          />
        </Box>
      </Box>
    </Keyboard>
  );
};
