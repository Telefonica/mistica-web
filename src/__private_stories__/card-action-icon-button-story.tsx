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
    Text2,
    Stack,
    IconStarFilled,
    IconStarRegular,
} from '..';

export default {
    title: 'Private/Deprecated Card Stories/Utils/CardActionIconButton',
};

export const Default: StoryComponent = () => {
    const [pressCount, setPressCount] = React.useState(0);
    const [checked, setChecked] = React.useState(false);
    return (
        <Stack space={16}>
            <Text2 regular>Cards render their topActions as icon buttons:</Text2>
            <DataCard
                topActions={[
                    {Icon: IconMobileDeviceRegular, label: 'Device', onPress: () => alert('icon press')},
                    {
                        Icon: IconShopRegular,
                        label: 'Shop',
                        onPress: () => {
                            alert(`Custom card action component press: ${pressCount + 1}`);
                            setPressCount(pressCount + 1);
                        },
                    },
                    {
                        checkedProps: {Icon: IconStarFilled, label: 'checked'},
                        uncheckedProps: {Icon: IconStarRegular, label: 'unchecked'},
                        checked,
                        onChange: setChecked,
                    },
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
                buttonPrimary={
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
