import { DateInput, Keyboard, TextInput } from "grommet";
import React, { ChangeEvent } from "react";
import { IInputComponentProps } from "../../definitions";

export const BotTextInput = (props: IInputComponentProps) => {
  const suggestionsProps = props.inputProps.suggestions;
  const renderCalendar = props.inputProps.type === "date";
  const allSuggestions = React.useMemo(
    () => suggestionsProps || [],
    [suggestionsProps]
  );
  const [suggestions, setSuggestions] = React.useState(allSuggestions);
  const newValue = props.value;

  React.useEffect(() => {
    if (!newValue) setSuggestions(allSuggestions);
    else {
      try {
        const regexp = new RegExp(`^${newValue}`);
        setSuggestions(allSuggestions.filter((s: string) => regexp.test(s)));
      } catch (error) {
        console.log("unable to filter suggestions", error);
      }
    }
  }, [newValue, allSuggestions]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    props.onChange(nextValue);
  };

  const onChangeCal = (event: { value: any }) => {
    props.onChange(event.value);
  };

  const onSelect = (event: any) => {
    event.fromSuggestion = true;
    props.onChange(event.suggestion);
  };

  const onSubmit = (e: any) => {
    if (e.fromSuggestion || e.shiftKey) {
      return true;
    }

    props.onSubmit();
  };
  const plainProp = { plain: true } as any;
  return (
    <Keyboard target="component" onEnter={onSubmit}>
      <>
        {!renderCalendar && (
          <TextInput
            {...{ ...props.inputProps, format: undefined }}
            focusIndicator={false}
            plain
            tabIndex={0}
            onFocus={() => props.onFocus(true)}
            onBlur={() => props.onFocus(false)}
            value={newValue}
            onChange={onChange}
            onSelect={onSelect}
            suggestions={suggestions}
            style={{
              fontWeight: "normal",
              color: props.fontColor,
            }}
            icon={props.Icon}
            width="100%"
          />
        )}
        {renderCalendar && (
          <DateInput
            className="dateinput"
            dropProps={{
              stretch: false,
              overflow: "scroll",
              responsive: true,
            }}
            inputProps={{
              readOnly: true,
              focusIndicator: false,
              onFocus: () => props.onFocus(true),
              onBlur: () => props.onFocus(false),
            }}
            size={"small"}
            format={props.inputProps.format}
            value={newValue}
            onChange={onChangeCal}
            {...plainProp}
          />
        )}
      </>
    </Keyboard>
  );
};
