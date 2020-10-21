import * as React from 'react';
import Box from './box';
import Stack from './stack';
import {createUseStyles} from './jss';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import ResponsiveLayout from './responsive-layout';
import GridLayout from './grid-layout';
import {useScreenSize, useTheme} from './hooks';
import OverscrollColor from './overscroll-color-context';
import {Text1, Text2, Text3, Text6} from './text';
import NavigationBreadcrumbs from './navigation-breadcrumbs';
import {ButtonPrimary, ButtonSecondary} from './button';

import type {TextPresetProps} from './text';
import ButtonLayout from './button-layout';

const useButtonLayoutStyles = createUseStyles(() => ({
    inlineBlockContainer: {
        // this inline block makes the parent grow with the width of its bigger children
        // this, toggether with applying width 100% to the buttons, allows us to have two
        // sibling buttons with the same width (the width of the bigger one).
        display: 'inline-block',
    },
    button: {
        '& > *': {
            width: '100%',
        },
    },
}));

type OverridableTextProps = {
    color?: TextPresetProps['color'];
    textDecoration?: TextPresetProps['textDecoration'];
};

type RichText = string | ({text: string} & OverridableTextProps);

const MobileHeaderButtonLayout: React.FC = ({children}) => {
    const classes = useButtonLayoutStyles();
    return (
        <div className={classes.inlineBlockContainer}>
            <Stack space={16}>
                {React.Children.toArray(children)
                    .filter(Boolean)
                    .map((button, idx) => (
                        <div key={idx} className={classes.button}>
                            {button}
                        </div>
                    ))}
            </Stack>
        </div>
    );
};

type HeaderProps = {
    pretitle?: RichText;
    title?: string;
    preamount?: RichText;
    amount?: string;
    button?: React.ReactElement<typeof ButtonPrimary>;
    secondaryButton?: React.ReactElement<typeof ButtonSecondary>;
    subtitle?: RichText;
    isErrorAmount?: boolean;
};

export const Header: React.FC<HeaderProps> = ({
    pretitle,
    title,
    preamount,
    amount,
    button,
    subtitle,
    isErrorAmount,
    secondaryButton,
}) => {
    const {isMobile} = useScreenSize();
    const theme = useTheme();
    const isInverse = useIsInverseVariant();

    const renderRichText = (richText: RichText, notOverridableProps: Omit<TextPresetProps, 'children'>) => {
        if (typeof richText === 'string') {
            return (
                <Text6 regular {...notOverridableProps}>
                    {richText}
                </Text6>
            );
        }
        const {text, ...textProps} = richText;
        return (
            <Text6 regular {...textProps} {...notOverridableProps}>
                {richText.text}
            </Text6>
        );
    };

    return (
        <Stack space={isMobile ? 24 : 32}>
            {(title || pretitle) && (
                <Stack space={8}>
                    {pretitle &&
                        renderRichText(pretitle, {
                            truncate: true,
                            color: theme.colors.textPrimary,
                        })}
                    <Text3 role="heading" aria-level={2}>
                        {title}
                    </Text3>
                </Stack>
            )}
            {(preamount || amount || button || subtitle) && (
                <Stack space={16}>
                    {(preamount || amount) && (
                        <Stack space={8}>
                            {preamount &&
                                renderRichText(preamount, {
                                    truncate: true,
                                    color: theme.colors.textPrimary,
                                })}
                            <Text1
                                truncate
                                color={
                                    isErrorAmount && !isInverse
                                        ? theme.colors.textDanger
                                        : theme.colors.textPrimary
                                }
                            >
                                {amount}
                            </Text1>
                        </Stack>
                    )}
                    {(button || secondaryButton) &&
                        (isMobile ? (
                            <MobileHeaderButtonLayout>
                                {button}
                                {secondaryButton}
                            </MobileHeaderButtonLayout>
                        ) : (
                            <ButtonLayout align="left">
                                {button}
                                {secondaryButton}
                            </ButtonLayout>
                        ))}
                    {subtitle && renderRichText(subtitle, {truncate: true})}
                </Stack>
            )}
        </Stack>
    );
};

type MainSectionHeaderProps = {
    title: string;
    description?: string;
    button?: React.ReactElement<typeof ButtonPrimary> | React.ReactElement<typeof ButtonSecondary>;
};

export const MainSectionHeader: React.FC<MainSectionHeaderProps> = ({title, description, button}) => {
    const {isMobile} = useScreenSize();

    return (
        <Stack space={32}>
            <Stack space={isMobile ? 12 : 16}>
                {title && (
                    <Text2 role="heading" aria-level={1} truncate>
                        {title}
                    </Text2>
                )}
                {description && <Text3>{description}</Text3>}
            </Stack>
            {button}
        </Stack>
    );
};

const useHeaderLayoutStyles = createUseStyles((theme) => ({
    background: {
        background: ({isInverse}) => (isInverse ? theme.colors.backgroundHeading : 'initial'),
    },
    gridItem: {
        gridColumn: 'span 6',
    },
}));

type HeaderLayoutProps = {
    isInverse?: boolean;
    breadcrumbs?: React.ReactElement<typeof NavigationBreadcrumbs>;
    header: React.ReactNode; // intentionally not forced to React.ReactElement<typeof Header> to allow skeletons for example
    extra?: React.ReactNode;
    sideBySideExtraOnDesktop?: boolean;
};

export const HeaderLayout: React.FC<HeaderLayoutProps> = ({
    isInverse = true,
    breadcrumbs,
    header,
    extra,
    sideBySideExtraOnDesktop = false,
}) => {
    const classes = useHeaderLayoutStyles({isInverse});
    const {isTabletOrSmaller} = useScreenSize();

    return (
        <ResponsiveLayout className={classes.background}>
            <ThemeVariant isInverse={isInverse}>
                <OverscrollColor />
                {isTabletOrSmaller ? (
                    <Box paddingTop={32} paddingBottom={24} paddingRight={16}>
                        <Stack space={24}>
                            {header}
                            {extra}
                        </Stack>
                    </Box>
                ) : sideBySideExtraOnDesktop ? (
                    <Box paddingTop={breadcrumbs ? 16 : 48} paddingBottom={48}>
                        <GridLayout>
                            <div className={classes.gridItem}>
                                <Stack space={32}>
                                    {breadcrumbs}
                                    {header}
                                </Stack>
                            </div>
                            {extra && <div className={classes.gridItem}>{extra}</div>}
                        </GridLayout>
                    </Box>
                ) : (
                    <Box paddingTop={breadcrumbs ? 16 : 48} paddingBottom={48}>
                        <GridLayout>
                            <div className={classes.gridItem}>
                                <Stack space={24}>
                                    <Stack space={32}>
                                        {breadcrumbs}
                                        {header}
                                    </Stack>
                                    {extra}
                                </Stack>
                            </div>
                        </GridLayout>
                    </Box>
                )}
            </ThemeVariant>
        </ResponsiveLayout>
    );
};

type MainSectionHeaderLayoutProps = {
    isInverse?: boolean;
    children: React.ReactElement<typeof MainSectionHeader>;
};

export const MainSectionHeaderLayout: React.FC<MainSectionHeaderLayoutProps> = ({
    isInverse = true,
    children,
}) => {
    const classes = useHeaderLayoutStyles({isInverse});
    const {isMobile} = useScreenSize();

    return (
        <ResponsiveLayout className={classes.background}>
            <ThemeVariant isInverse={isInverse}>
                <OverscrollColor />
                {isMobile ? (
                    <Box paddingTop={12} paddingBottom={24}>
                        {children}
                    </Box>
                ) : (
                    <GridLayout>
                        <div className={classes.gridItem}>
                            <Box paddingY={48}>{children}</Box>
                        </div>
                    </GridLayout>
                )}
            </ThemeVariant>
        </ResponsiveLayout>
    );
};
