import {
  Avatar,
  DisplayDataCard,
  IconLightningRegular,
  IconStarFilled,
  IconStarRegular,
  Stack,
  StackingGroup,
  Tag,
} from "@telefonica/mistica";

export const CardItem = () => {
  return (
    <DisplayDataCard
      headline={
        <Stack space={12}>
          <Tag type="active">{"Tag example"}</Tag>
          <StackingGroup
            stacked={true}
            maxItems={3}
            moreItemsStyle={{ type: "circle", size: 40 }}
          >
            {Array.from({ length: 12 }, (_, idx) => (
              <Avatar
                key={idx}
                border={true}
                size={36}
                initials={["TT", "AA", "GC", "", "MA", "PA"][idx % 5]}
                src="https://mistica-web.vercel.app/static/media/avatar.cb2db2e6.jpg"
              />
            ))}
          </StackingGroup>
        </Stack>
      }
      pretitle={"prettier prop"}
      title={"Title prop"}
      description={"description example test"}
      actions={[
        {
          Icon: IconLightningRegular,
          onPress: () => {},
          label: "Lightning",
        },
        {
          checkedProps: {
            Icon: IconStarFilled,
            label: "checked",
          },
          uncheckedProps: {
            Icon: IconStarRegular,
            label: "unchecked",
          },
          defaultChecked: false,
          onChange: () => {},
        },
      ]}
      dataAttributes={{ testid: "display-data-card" }}
      aria-label="Display data card label"
    />
  );
};
