import * as React from 'react';
import {
    DataCard,
    MediaCard,
    CoverCard,
    NakedCard,
    CommunityAdvancedDataCard,
    Checkbox,
    Switch,
    RadioButton,
    RadioGroup,
    Stack,
    Inline,
    Text3,
    ButtonPrimary,
    ToggleIconButton,
    IconHeartRegular,
    IconHeartFilled,
    IconLockClosedRegular,
    IconLockOpenRegular,
} from '..';
import {ThemeVariantWrapper} from './card-common';
import beachImg from './images/beach.jpg';

import type {Variant} from '../theme-variant-context';

export default {title: 'Components/Cards/Selection'};

type SelectionArgs = {
    card: 'data' | 'media' | 'cover' | 'naked' | 'advanced';
    control: 'checkbox' | 'switch' | 'radio';
    selected?: boolean;
    customRender: boolean;
    variant: Variant;
    variantOutside: Variant;
};

export const Selection: StoryComponent<SelectionArgs> = ({
    card,
    control,
    selected,
    customRender,
    variant,
    variantOutside,
}) => {
    const Card = {data: DataCard, media: MediaCard, cover: CoverCard, naked: NakedCard, advanced: DataCard}[
        card
    ];
    const renderControl = customRender
        ? ({controlElement}: {controlElement: React.ReactElement}) => (
              <Inline space={8} alignItems="center">
                  {controlElement}
                  <Text3 regular>Custom control</Text3>
              </Inline>
          )
        : undefined;
    const cards = (
        <Stack space={24}>
            {['First', 'Second'].map((title) => {
                const controlElement =
                    control === 'radio' ? (
                        <RadioButton
                            value={title}
                            {...(renderControl ? {render: renderControl} : {children: `Select ${title}`})}
                        />
                    ) : control === 'switch' ? (
                        <Switch
                            name={title}
                            {...(renderControl ? {render: renderControl} : {children: `Select ${title}`})}
                        />
                    ) : (
                        <Checkbox
                            name={title}
                            {...(renderControl ? {render: renderControl} : {children: `Select ${title}`})}
                        />
                    );
                return card === 'advanced' ? (
                    <CommunityAdvancedDataCard
                        key={`${title}-${control}`}
                        title={title}
                        description="This is a description"
                        selected={selected}
                        slot={customRender ? [controlElement] : undefined}
                        actions={customRender ? undefined : [controlElement]}
                    />
                ) : (
                    <Card
                        key={`${title}-${control}`}
                        title={title}
                        description="This is a description"
                        imageSrc={card === 'data' ? undefined : beachImg}
                        variant={
                            card === 'naked' || (card === 'cover' && variant === 'default')
                                ? undefined
                                : variant
                        }
                        selected={selected}
                        slot={customRender ? controlElement : undefined}
                        topActions={customRender ? undefined : [controlElement]}
                    />
                );
            })}
        </Stack>
    );
    return (
        <ThemeVariantWrapper variant={variantOutside}>
            {control === 'radio' ? (
                <RadioGroup name="cards">{cards}</RadioGroup>
            ) : (
                <div role="group" aria-label="Cards">
                    {cards}
                </div>
            )}
        </ThemeVariantWrapper>
    );
};

Selection.args = {
    card: 'data',
    customRender: false,
    control: 'checkbox',
    selected: undefined,
    variant: 'default',
    variantOutside: 'default',
};
Selection.argTypes = {
    customRender: {control: 'boolean'},
    card: {options: ['data', 'media', 'cover', 'naked', 'advanced'], control: {type: 'select'}},
    control: {options: ['checkbox', 'switch', 'radio'], control: {type: 'select'}},
    selected: {type: 'boolean', options: [undefined, true, false], control: {type: 'select'}},
    variant: {options: ['default', 'brand', 'inverse', 'negative', 'media'], control: {type: 'select'}},
    variantOutside: {
        options: ['default', 'brand', 'inverse', 'negative', 'alternative', 'media'],
        control: {type: 'select'},
    },
};

export const CustomSelection = (): JSX.Element => {
    const [selected, setSelected] = React.useState(false);
    const [favorite, setFavorite] = React.useState(false);
    return (
        <ThemeVariantWrapper>
            <Stack space={24}>
                <ButtonPrimary onPress={() => setSelected(!selected)}>
                    {selected ? 'Unselect card' : 'Select card'}
                </ButtonPrimary>
                <DataCard title="External selection" selected={selected} />
                <DataCard
                    title="Custom selector"
                    selected={favorite}
                    slot={
                        <ToggleIconButton
                            checked={favorite}
                            onChange={setFavorite}
                            checkedProps={{Icon: IconHeartFilled, 'aria-label': 'Remove favorite'}}
                            uncheckedProps={{Icon: IconHeartRegular, 'aria-label': 'Add favorite'}}
                        />
                    }
                />
                <DataCard
                    title="Lock action"
                    slot={
                        <ToggleIconButton
                            checkedProps={{Icon: IconLockClosedRegular, 'aria-label': 'Unlock'}}
                            uncheckedProps={{Icon: IconLockOpenRegular, 'aria-label': 'Lock'}}
                        />
                    }
                />
            </Stack>
        </ThemeVariantWrapper>
    );
};
