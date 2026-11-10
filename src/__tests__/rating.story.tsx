import * as React from 'react';
import {Rating, InfoRating} from '../rating';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from '../test-utils/theme';
import IconStarRegular from '../generated/mistica-icons/icon-star-regular';
import IconStarFilled from '../generated/mistica-icons/icon-star-filled';
import IconLightningRegular from '../generated/mistica-icons/icon-lightning-regular';
import IconLightningFilled from '../generated/mistica-icons/icon-lightning-filled';
import {vars} from '../skins/skin-contract.css';
import {Text2} from '../text';

export const Scenario1 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <InfoRating value={3} />
        </ThemeContextProvider>
    );
};
export const Scenario2 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <InfoRating aria-label="info rating" />
        </ThemeContextProvider>
    );
};
export const Scenario3 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Text2 regular id="label">
                This is a label
            </Text2>
            <InfoRating value={3} aria-labelledby="label" />
        </ThemeContextProvider>
    );
};
export const Scenario4 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Rating aria-label="rating" />
        </ThemeContextProvider>
    );
};
export const Scenario5 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Rating aria-label="rating" type="qualitative" />
        </ThemeContextProvider>
    );
};
export const Scenario6 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Text2 regular id="label">
                This is a label
            </Text2>
            <Rating value={3} aria-labelledby="label" />
        </ThemeContextProvider>
    );
};
export const Scenario7 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Rating aria-label="rating" defaultValue={2} />
        </ThemeContextProvider>
    );
};
export const Scenario8 = (): JSX.Element => {
    const ControlledRating = () => {
        const [value, setValue] = React.useState(2);
        return <Rating aria-label="rating" value={value} onChangeValue={setValue} />;
    };
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <ControlledRating />
        </ThemeContextProvider>
    );
};
export const Scenario9 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Rating aria-label="rating" count={3} valueLabels={['first', 'second', 'third']} />
        </ThemeContextProvider>
    );
};
export const Scenario10 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Rating
                aria-label="rating"
                type="qualitative"
                icons={[
                    {
                        ActiveIcon: IconStarFilled,
                        InactiveIcon: IconStarRegular,
                        color: vars.colors.controlActivated,
                    },
                    {
                        ActiveIcon: IconLightningFilled,
                        InactiveIcon: IconLightningRegular,
                        color: vars.colors.controlActivated,
                    },
                ]}
                valueLabels={['first', 'second']}
            />
        </ThemeContextProvider>
    );
};
