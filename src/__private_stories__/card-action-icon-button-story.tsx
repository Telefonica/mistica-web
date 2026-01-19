import * as React from 'react';
import {
    DataCard,
    ButtonPrimary,
    ButtonLink,
    IconMobileDeviceRegular,
    skinVars,
    Circle,
    Tag,
    IconShopRegular,
    CardActionIconButton,
    Text2,
    Stack,
    IconStarFilled,
    IconStarRegular,
} from '..';

export default {
    title: 'Private/Deprecated Card Stories/Utils/CardActionIconButton',
};

const MyCustomCardActionComponent = () => {
    const [pressCount, setPressCount] = React.useState(0);

    return (
        <CardActionIconButton
            Icon={IconShopRegular}
            onPress={() => {
                alert(`Custom card action component press: ${pressCount + 1}`);
                setPressCount(pressCount + 1);
            }}
            label="Shop"
        />
    );
};

const MyCustomCardActionToggleComponent = () => {
    const [checked, setChecked] = React.useState(false);

    return (
        <CardActionIconButton
            checkedProps={{Icon: IconStarFilled, label: 'checked'}}
            uncheckedProps={{Icon: IconStarRegular, label: 'unchecked'}}
            checked={checked}
            onChange={(checkedValue) => setChecked(checkedValue)}
        />
    );
};

export const Default: StoryComponent = () => {
    return (
        <Stack space={16}>
            <Text2 regular>
                You can use CardActionIconButton component to add top actions to most mistica cards:
            </Text2>
            <DataCard
                actions={[
                    <CardActionIconButton
                        key="1"
                        Icon={IconMobileDeviceRegular}
                        onPress={() => {
                            alert('icon press');
                        }}
                        label="Device"
                    />,
                    <MyCustomCardActionComponent key="2" />,
                    <MyCustomCardActionToggleComponent key="3" />,
                ]}
                asset={
                    <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
                        <IconShopRegular color={skinVars.colors.brand} />
                    </Circle>
                }
                headline={<Tag type="promo">Headline</Tag>}
                title="Title"
                subtitle="Subtitle"
                description="Description"
                button={
                    <ButtonPrimary small onPress={() => {}}>
                        Action
                    </ButtonPrimary>
                }
                buttonLink={
                    <ButtonLink small onPress={() => {}}>
                        Link
                    </ButtonLink>
                }
            />
        </Stack>
    );
};

Default.storyName = 'CardActionIconButton';
