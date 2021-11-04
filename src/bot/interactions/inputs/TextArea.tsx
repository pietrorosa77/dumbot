import * as React from "react";
import { Keyboard, TextArea } from "grommet";
import { ChangeEvent } from "react";
import { IInputComponentProps } from "../../definitions";

export const BotTextAreaInput = (props: IInputComponentProps) => {
  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const nextValue = event.target.value;
    props.onChange(nextValue);
  };

  const onSubmit = () => {
    props.onSubmit();
  };

  return (
    <Keyboard target="component" onEnter={onSubmit}>
      <TextArea
        {...(props.inputProps as any)}
        value={props.value}
        onFocus={() => props.onFocus(true)}
        onBlur={() => props.onFocus(false)}
        onChange={onChange}
        fill
        plain
        tabIndex={0}
        focusIndicator={false}
        style={{
          fontWeight: "normal",
          color: props.fontColor,
        }}
      />
    </Keyboard>
  );
};
