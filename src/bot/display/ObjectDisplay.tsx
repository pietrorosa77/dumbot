import { Box, NameValueList, NameValuePair, Text } from "grommet";
import { IDisplayResponseProps } from "../definitions";

const DisplayItem = (props: { item: any }) => {
  if (Array.isArray(props.item)) {
    return <>{props.item.join(", ")}</>;
  }

  if (typeof props.item === "object" && props.item !== null) {
    return (
      <NameValueList pairProps={{ direction: "column" }}>
        {Object.entries(props.item).map(([name, value]) => (
          <NameValuePair
            name={
              <Text size="small" weight="bold">
                {name}
              </Text>
            }
            key={name}
          >
            <DisplayItem item={value} />
          </NameValuePair>
        ))}
      </NameValueList>
    );
  }

  return <>{props.item}</>;
};

export const ObjectAnswerDisplay = (props: IDisplayResponseProps) => {
  const answer = props.message.output.value as any;

  return (
    <Box pad="small">
      <NameValueList pairProps={{ direction: "column" }}>
        {Object.entries(answer).map(([name, value]) => (
          <NameValuePair
            name={
              <Text size="small" weight="bold">
                {name}
              </Text>
            }
            key={name}
          >
            <DisplayItem item={value} />
          </NameValuePair>
        ))}
      </NameValueList>
    </Box>
  );
};
