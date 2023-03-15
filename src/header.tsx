import * as React from 'react';
import Box from './box';
import Stack from './stack';
import {useIsInverseVariant} from './theme-variant-context';
import ResponsiveLayout from './responsive-layout';
import GridLayout from './grid-layout';
import {useScreenSize} from './hooks';
import OverscrollColor from './overscroll-color-context';
import {Text8, Text7, Text6, Text3} from './text';
import NavigationBreadcrumbs from './navigation-breadcrumbs';
import {ButtonPrimary, ButtonSecondary} from './button';
import ButtonGroup from './button-group';
import {vars} from './skins/skin-contract.css';

import type {DataAttributes, RendersElement, RendersNullableElement} from './utils/types';
import type {TextPresetProps} from './text';

type OverridableTextProps = {
    color?: TextPresetProps['color'];
    decoration?: TextPresetProps['decoration'];
    truncate?: TextPresetProps['truncate'];
};

type RichText = string | ({text: string} & OverridableTextProps);

type HeaderProps = {
    pretitle?: RichText;
    title?: string;
    description?: string;
    dataAttributes?: DataAttributes;
    /**
     * @deprecated This field is deprecated, please use the extra slot in the HeaderLayout component instead.
     */
    preamount?: RichText;
    /**
     * @deprecated This field is deprecated, please use the extra slot in the HeaderLayout component instead.
     */
    amount?: string;
    /**
     * @deprecated This field is deprecated, please use the extra slot in the HeaderLayout component instead.
     */
    button?: RendersNullableElement<typeof ButtonPrimary>;
    /**
     * @deprecated This field is deprecated, please use the extra slot in the HeaderLayout component instead.
     */
    secondaryButton?: RendersNullableElement<typeof ButtonSecondary>;
    /**
     * @deprecated This field is deprecated, please use the extra slot in the HeaderLayout component instead.
     */
    subtitle?: RichText;
    /**
     * @deprecated This field is deprecated, please use the extra slot in the HeaderLayout component instead.
     */
    isErrorAmount?: boolean;
};

export const Header: React.FC<HeaderProps> = ({
    pretitle,
    title,
    description,
    dataAttributes,
    preamount,
    amount,
    button,
    subtitle,
    isErrorAmount,
    secondaryButton,
}) => {
    const {isTabletOrSmaller} = useScreenSize();
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
        <Stack space={isTabletOrSmaller ? 24 : 32} dataAttributes={dataAttributes}>
            {(title || pretitle || description) && (
                <Box paddingRight={16}>
                    <Stack space={8}>
                        {pretitle && renderRichText(pretitle, {color: vars.colors.textPrimary})}
                        <Text6 role="heading" aria-level={2}>
                            {title}
                        </Text6>
                        {description && (
                            <Text3 regular color={vars.colors.textSecondary}>
                                {description}
                            </Text3>
                        )}
                    </Stack>
                </Box>
            )}
            {(preamount || amount || button || subtitle) && (
                <Stack space={16}>
                    {(preamount || amount) && (
                        <Stack space={8}>
                            {preamount && renderRichText(preamount, {color: vars.colors.textPrimary})}
                            <Text8
                                color={
                                    isErrorAmount && !isInverse
                                        ? vars.colors.highlight
                                        : vars.colors.textPrimary
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
    button?: RendersNullableElement<typeof ButtonPrimary> | RendersNullableElement<typeof ButtonSecondary>;
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

type HeaderLayoutProps = {
    isInverse?: boolean;
    breadcrumbs?: RendersNullableElement<typeof NavigationBreadcrumbs>;
    /**
     * Intentionally not forced to RendersElement<typeof Header> to allow skeletons for example
     * The header is optional in order to allow webviews to delegate the header visualization to the surrounding native app.
     */
    header?: React.ReactNode;
    extra?: React.ReactNode;
    sideBySideExtraOnDesktop?: boolean;
    children?: void;
    dataAttributes?: DataAttributes;
    bleed?: boolean;
};

export const HeaderLayout: React.FC<HeaderLayoutProps> = ({
    isInverse = true,
    breadcrumbs,
    header,
    extra,
    sideBySideExtraOnDesktop = false,
    dataAttributes,
    bleed = false,
}) => {
    const {isTabletOrSmaller} = useScreenSize();

    return (
        <div>
            <ResponsiveLayout
                isInverse={isInverse}
                dataAttributes={{'component-name': 'HeaderLayout', ...dataAttributes}}
            >
                <OverscrollColor />
                {isTabletOrSmaller ? (
                    <Box paddingTop={header ? 32 : 0} paddingBottom={24}>
                        <Stack space={24}>
                            {header}
                            {!bleed && extra}
                        </Stack>
                    </Box>
                ) : sideBySideExtraOnDesktop ? (
                    <Box paddingTop={breadcrumbs ? 16 : 48} paddingBottom={48}>
                        <GridLayout
                            template="6+6"
                            left={
                                <Stack space={32}>
                                    {breadcrumbs}
                                    {header}
                                </Stack>
                            }
                            right={extra}
                        />
                    </Box>
                ) : (
                    <Box paddingTop={breadcrumbs ? 16 : 48} paddingBottom={bleed ? 32 : 48}>
                        <Stack space={isTabletOrSmaller ? 24 : 32}>
                            <Stack space={32}>
                                {breadcrumbs}
                                {header}
                            </Stack>
                            {!bleed && extra}
                        </Stack>
                    </Box>
                )}
            </ResponsiveLayout>
            {bleed && extra && (isTabletOrSmaller || !sideBySideExtraOnDesktop) && (
                <ResponsiveLayout
                    backgroundColor={
                        isInverse
                            ? `linear-gradient(to bottom, ${vars.colors.backgroundBrand} 40px, ${vars.colors.background} 0%)`
                            : vars.colors.background
                    }
                >
                    <Box paddingBottom={isTabletOrSmaller ? 24 : 48}>
                        <Stack space={isTabletOrSmaller ? 24 : 32}>{extra}</Stack>
                    </Box>
                </ResponsiveLayout>
            )}
        </div>
    );
};

type MainSectionHeaderLayoutProps = {
    isInverse?: boolean;
    children: RendersElement<typeof MainSectionHeader>;
};

export const MainSectionHeaderLayout: React.FC<MainSectionHeaderLayoutProps> = ({
    isInverse = true,
    children,
}) => {
    const {isTabletOrSmaller} = useScreenSize();

    return (
        <ResponsiveLayout isInverse={isInverse}>
            <OverscrollColor />
            {isTabletOrSmaller ? (
                <Box paddingTop={12} paddingBottom={24}>
                    {children}
                </Box>
            ) : (
                <GridLayout template="6+6" left={<Box paddingY={48}>{children}</Box>} right={null} />
            )}
        </ResponsiveLayout>
    );
};
