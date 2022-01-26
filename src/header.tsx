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
import ButtonGroup from './button-group';

import type {ButtonProps} from './button';
import type {TextPresetProps} from './text';
import type {NavigationBreadcrumbsProps} from './navigation-breadcrumbs';

type OverridableTextProps = {
    color?: TextPresetProps['color'];
    /** @deprecated use decoration prop */
    textDecoration?: TextPresetProps['textDecoration'];
    decoration?: TextPresetProps['decoration'];
    truncate?: TextPresetProps['truncate'];
};

type RichText = string | ({text: string} & OverridableTextProps);

type HeaderProps = {
    pretitle?: RichText;
    title?: string;
    preamount?: RichText;
    amount?: string;
    button?: React.ReactElement<ButtonProps, typeof ButtonPrimary>;
    secondaryButton?: React.ReactElement<ButtonProps, typeof ButtonSecondary>;
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
    const {isTabletOrSmaller} = useScreenSize();
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
        <Stack space={isTabletOrSmaller ? 24 : 32}>
            {(title || pretitle) && (
                <Box paddingRight={16}>
                    <Stack space={8}>
                        {pretitle && renderRichText(pretitle, {color: theme.colors.textPrimary})}
                        <Text6 role="heading" aria-level={2}>
                            {title}
                        </Text6>
                    </Stack>
                </Box>
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
                    {(button || secondaryButton) && (
                        <ButtonGroup primaryButton={button} secondaryButton={secondaryButton} />
                    )}
                    {subtitle && renderRichText(subtitle, {})}
                </Stack>
            )}
        </Stack>
    );
};

type MainSectionHeaderProps = {
    title: string;
    description?: string;
    button?:
        | React.ReactElement<ButtonProps, typeof ButtonPrimary>
        | React.ReactElement<ButtonProps, typeof ButtonSecondary>;
};

export const MainSectionHeader: React.FC<MainSectionHeaderProps> = ({title, description, button}) => {
    const {isTabletOrSmaller} = useScreenSize();

    return (
        <Stack space={32}>
            <Stack space={isTabletOrSmaller ? 12 : 16}>
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
    breadcrumbs?: React.ReactElement<NavigationBreadcrumbsProps, typeof NavigationBreadcrumbs>;
    header: React.ReactNode; // intentionally not forced to React.ReactElement<typeof Header> to allow skeletons for example
    extra?: React.ReactNode;
    sideBySideExtraOnDesktop?: boolean;
    children?: void;
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
    children: React.ReactElement<MainSectionHeaderProps, typeof MainSectionHeader>;
};

export const MainSectionHeaderLayout: React.FC<MainSectionHeaderLayoutProps> = ({
    isInverse = true,
    children,
}) => {
    const classes = useHeaderLayoutStyles({isInverse});
    const {isTabletOrSmaller} = useScreenSize();

    return (
        <ResponsiveLayout className={classes.background}>
            <ThemeVariant isInverse={isInverse}>
                <OverscrollColor />
                {isTabletOrSmaller ? (
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
