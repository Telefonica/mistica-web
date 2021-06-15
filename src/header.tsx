import * as React from 'react';
import Box from './box';
import Stack from './stack';
import {createUseStyles} from './jss';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import ResponsiveLayout from './responsive-layout';
import GridLayout from './grid-layout';
import {useScreenSize, useTheme} from './hooks';
import OverscrollColor from './overscroll-color-context';
import {Text8, Text7, Text6, Text3} from './text';
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
    truncate?: TextPresetProps['truncate'];
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

    const renderRichText = (richText: RichText, baseProps: Omit<TextPresetProps, 'children'>) => {
        if (typeof richText === 'string') {
            return (
                <Text3 regular {...baseProps}>
                    {richText}
                </Text3>
            );
        }
        const {text, ...textProps} = richText;
        return (
            <Text3 regular {...baseProps} {...textProps}>
                {richText.text}
            </Text3>
        );
    };

    return (
        <Stack space={isMobile ? 24 : 32}>
            {(title || pretitle) && (
                <Stack space={8}>
                    {pretitle && renderRichText(pretitle, {color: theme.colors.textPrimary})}
                    <Text6 role="heading" aria-level={2}>
                        {title}
                    </Text6>
                </Stack>
            )}
            {(preamount || amount || button || subtitle) && (
                <Stack space={16}>
                    {(preamount || amount) && (
                        <Stack space={8}>
                            {preamount && renderRichText(preamount, {color: theme.colors.textPrimary})}
                            <Text8
                                color={
                                    isErrorAmount && !isInverse
                                        ? theme.colors.highlight
                                        : theme.colors.textPrimary
                                }
                            >
                                {amount}
                            </Text8>
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
                    {subtitle && renderRichText(subtitle, {})}
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
                    <Text7 role="heading" aria-level={1}>
                        {title}
                    </Text7>
                )}
                {description && <Text6>{description}</Text6>}
            </Stack>
            {button}
        </Stack>
    );
};

const useHeaderLayoutStyles = createUseStyles((theme) => ({
    background: {
        background: ({isInverse}) => (isInverse ? theme.colors.backgroundBrand : 'initial'),
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
                    <Box paddingTop={32} paddingBottom={24}>
                        <Stack space={24}>
                            <Box paddingRight={16}>{header}</Box>
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
