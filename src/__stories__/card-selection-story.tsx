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
import {ThemeVariantWrapper, normalizeAspectRatio, commonArgTypes} from './card-common';
import beachImg from './images/beach.jpg';

import type {CardAspectRatio, CardSelectionProps} from '../card-internal';
import type {Variant} from '../theme-variant-context';

export default {title: 'Components/Cards/Selection'};

type SelectionArgs = {
    card: 'data' | 'media' | 'cover' | 'naked' | 'advanced';
    control: 'checkbox' | 'switch' | 'radio';
    selected?: boolean;
    firstCheckbox?: CardSelectionProps['checkbox'];
    secondCheckbox?: CardSelectionProps['checkbox'];
    firstSwitch?: CardSelectionProps['switch'];
    secondSwitch?: CardSelectionProps['switch'];
    firstRadioValue: string;
    secondRadioValue: string;
    aspectRatio?: string | number;
    customRender: boolean;
    variant: Variant;
    variantOutside: Variant;
};

export const Selection: StoryComponent<SelectionArgs> = ({
    card,
    control,
    selected,
    firstCheckbox,
    secondCheckbox,
    firstSwitch,
    secondSwitch,
    firstRadioValue,
    secondRadioValue,
    customRender,
    aspectRatio,
    variant,
    variantOutside,
}) => {
    const [customValues, setCustomValues] = React.useState<Record<string, boolean>>({});
    const [radioValue, setRadioValue] = React.useState('');
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
            {[
                {
                    title: 'First',
                    checkbox: firstCheckbox,
                    switchProps: firstSwitch,
                    radioValueProp: firstRadioValue,
                },
                {
                    title: 'Second',
                    checkbox: secondCheckbox,
                    switchProps: secondSwitch,
                    radioValueProp: secondRadioValue,
                },
            ].map(({title, checkbox, switchProps, radioValueProp}) => {
                const controlElement =
                    control === 'radio' ? (
                        <RadioButton
                            value={radioValueProp}
                            {...(renderControl ? {render: renderControl} : {children: `Select ${title}`})}
                        />
                    ) : control === 'switch' ? (
                        <Switch
                            name={title}
                            checked={!!customValues[title]}
                            onChange={(value) => setCustomValues({...customValues, [title]: value})}
                            {...(renderControl ? {render: renderControl} : {children: `Select ${title}`})}
                        />
                    ) : (
                        <Checkbox
                            name={title}
                            checked={!!customValues[title]}
                            onChange={(value) => setCustomValues({...customValues, [title]: value})}
                            {...(renderControl ? {render: renderControl} : {children: `Select ${title}`})}
                        />
                    );
                const selectedValue =
                    selected ??
                    (customRender
                        ? control === 'radio'
                            ? radioValue === radioValueProp
                            : !!customValues[title]
                        : undefined);
                const selectionProps =
                    customRender || selected !== undefined
                        ? {selected: selectedValue}
                        : control === 'radio'
                          ? {radioValue: radioValueProp ?? title}
                          : control === 'switch'
                            ? {switch: switchProps ?? {name: title}}
                            : {checkbox: checkbox ?? {name: title}};
                return card === 'advanced' ? (
                    <CommunityAdvancedDataCard
                        key={`${title}-${control}-${control === 'switch' ? switchProps?.defaultValue : checkbox?.defaultValue}`}
                        title={title}
                        description="This is a description"
                        slot={customRender ? [controlElement] : undefined}
                        {...selectionProps}
                    />
                ) : (
                    <Card
                        key={`${title}-${control}-${control === 'switch' ? switchProps?.defaultValue : checkbox?.defaultValue}`}
                        title={title}
                        description="This is a description"
                        aspectRatio={normalizeAspectRatio(aspectRatio) as CardAspectRatio}
                        imageSrc={card === 'data' ? undefined : beachImg}
                        variant={
                            card === 'naked' || (card === 'cover' && variant === 'default')
                                ? undefined
                                : variant
                        }
                        slot={customRender ? controlElement : undefined}
                        {...selectionProps}
                    />
                );
            })}
        </Stack>
    );
    return (
        <ThemeVariantWrapper variant={variantOutside}>
            {control === 'radio' ? (
                <RadioGroup name="cards" value={radioValue} onChange={setRadioValue}>
                    {cards}
                </RadioGroup>
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
    aspectRatio: undefined,
    customRender: false,
    control: 'checkbox',
    selected: undefined,
    firstCheckbox: {name: 'first-checkbox', defaultValue: false, disabled: false},
    secondCheckbox: {name: 'second-checkbox', defaultValue: false, disabled: false},
    firstSwitch: {name: 'first-switch', defaultValue: false, disabled: false},
    secondSwitch: {name: 'second-switch', defaultValue: false, disabled: false},
    firstRadioValue: 'First',
    secondRadioValue: 'Second',
    variant: 'default',
    variantOutside: 'default',
};
Selection.argTypes = {
    firstCheckbox: {
        control: 'object',
        if: {arg: 'control', eq: 'checkbox'},
        description:
            'Edit name, defaultValue and disabled. Add value to test a controlled state; defaultValue sets the initial state.',
    },
    secondCheckbox: {
        control: 'object',
        if: {arg: 'control', eq: 'checkbox'},
        description:
            'Edit name, defaultValue and disabled. Add value to test a controlled state; defaultValue sets the initial state.',
    },
    firstSwitch: {
        control: 'object',
        if: {arg: 'control', eq: 'switch'},
        description:
            'Edit name, defaultValue and disabled. Add value to test a controlled state; defaultValue sets the initial state.',
    },
    secondSwitch: {
        control: 'object',
        if: {arg: 'control', eq: 'switch'},
        description:
            'Edit name, defaultValue and disabled. Add value to test a controlled state; defaultValue sets the initial state.',
    },
    firstRadioValue: {control: 'text', if: {arg: 'control', eq: 'radio'}},
    secondRadioValue: {control: 'text', if: {arg: 'control', eq: 'radio'}},
    aspectRatio: commonArgTypes.aspectRatio,
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

export const IndependentSlot = (): JSX.Element => (
    <ThemeVariantWrapper>
        <DataCard title="Independent slot" slot={<Checkbox name="option">Independent option</Checkbox>} />
    </ThemeVariantWrapper>
);

export const AdvancedSwitch = (): JSX.Element => (
    <ThemeVariantWrapper>
        <CommunityAdvancedDataCard
            title="AdvancedDataCard con Switch"
            description="Pulsa la card o el control para cambiar la selección."
            switch={{name: 'advanced-switch'}}
        />
    </ThemeVariantWrapper>
);
