import * as React from "react";
import { Keyboard, MaskedInput } from "grommet";
import { ChangeEvent } from "react";
//import { IInputComponentProps } from "../../definitions";
import * as masks from "../../interactions/availableMasks";

export const BotMaskedInput = (props: any) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    props.onChange(nextValue);
  };

  const onSubmit = () => {
    props.onSubmit();
  };

  const mask = props.inputProps.libraryMask
    ? (masks as any)[props.inputProps.libraryMask](props.value)
    : props.inputProps.mask;

  return (
    <Keyboard target="component" onEnter={onSubmit}>
      <MaskedInput
        {...(props.inputProps as any)}
        focusIndicator={false}
        plain
        tabIndex={0}
        onFocus={() => props.onFocus(true)}
        onBlur={() => props.onFocus(false)}
        value={props.value}
        onChange={onChange}
        style={{
          fontWeight: "normal",
          color: props.fontColor,
        }}
        icon={props.Icon}
        mask={mask}
        width="100%"
      />
    </Keyboard>
  );
};
