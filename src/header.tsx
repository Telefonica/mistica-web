'use client';
import * as React from 'react';
import Box from './box';
import Stack from './stack';
import {useIsInverseVariant} from './theme-variant-context';
import ResponsiveLayout from './responsive-layout';
import GridLayout from './grid-layout';
import {useSetOverscrollColor} from './overscroll-color-context';
import {Text8, Text7, Text6, Text3, Text2} from './text';
import ButtonGroup from './button-group';
import {vars} from './skins/skin-contract.css';
import * as styles from './header.css';
import {getPrefixedDataAttributes} from './utils/dom';
import {Title2, Title3} from './title';

import type NavigationBreadcrumbs from './navigation-breadcrumbs';
import type {ButtonPrimary, ButtonSecondary} from './button';
import type {DataAttributes, HeadingType, RendersElement, RendersNullableElement} from './utils/types';
import type {TextPresetProps} from './text';

type OverridableTextProps = {
    color?: TextPresetProps['color'];
    decoration?: TextPresetProps['decoration'];
    truncate?: TextPresetProps['truncate'];
};

type RichText = string | ({text: string} & OverridableTextProps);

type HeaderProps = {
    headline?: React.ReactNode;
    pretitle?: RichText;
    pretitleAs?: HeadingType;
    title?: string;
    titleAs?: HeadingType;
    description?: string;
    small?: boolean;
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

export const Header = ({
    headline,
    pretitle,
    pretitleAs,
    title,
    titleAs = 'h2',
    description,
    dataAttributes,
    small = false,
    preamount,
    amount,
    button,
    subtitle,
    isErrorAmount,
    secondaryButton,
}: HeaderProps): JSX.Element => {
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
        <Stack space={{mobile: 24, desktop: 32}} dataAttributes={dataAttributes}>
            {(title || pretitle || description) && (
                <Box paddingRight={16}>
                    <Stack space={8}>
                        {headline}
                        {pretitle &&
                            renderRichText(pretitle, {color: vars.colors.textPrimary, as: pretitleAs})}
                        {title &&
                            (small ? (
                                <Title2 as={titleAs}>{title}</Title2>
                            ) : (
                                <Title3 as={titleAs}>{title}</Title3>
                            ))}
                        {description &&
                            (small ? (
                                <Text2 regular color={vars.colors.textSecondary}>
                                    {description}
                                </Text2>
                            ) : (
                                <Text3 regular color={vars.colors.textSecondary}>
                                    {description}
                                </Text3>
                            ))}
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
    titleAs?: HeadingType;
    description?: string;
    button?: RendersNullableElement<typeof ButtonPrimary> | RendersNullableElement<typeof ButtonSecondary>;
};

export const MainSectionHeader = ({
    title,
    titleAs = 'h1',
    description,
    button,
}: MainSectionHeaderProps): JSX.Element => {
    return (
        <Stack space={32}>
            <Stack space={{mobile: 12, desktop: 16}}>
                {title && <Text7 as={titleAs}>{title}</Text7>}
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
    noPaddingY?: boolean;
};

export const HeaderLayout = ({
    isInverse = true,
    breadcrumbs,
    header,
    extra,
    sideBySideExtraOnDesktop = false,
    dataAttributes,
    bleed = false,
    noPaddingY = false,
}: HeaderLayoutProps): JSX.Element => {
    const isBleedActivated = bleed && isInverse && extra;

    const mainContent = (
        <div>
            {breadcrumbs && <div className={styles.breadcrumbs}>{breadcrumbs}</div>}
            {header}
        </div>
    );

    useSetOverscrollColor(isInverse ? {topColor: vars.colors.backgroundBrandTop} : {});

    return (
        <div {...getPrefixedDataAttributes({'component-name': 'HeaderLayout', ...dataAttributes})}>
            <ResponsiveLayout isInverse={isInverse}>
                <Box
                    paddingTop={
                        noPaddingY
                            ? 0
                            : {
                                  mobile: header ? 32 : 0,
                                  desktop: breadcrumbs ? 16 : 48,
                              }
                    }
                    paddingBottom={{
                        mobile: noPaddingY && !isBleedActivated ? 0 : 24,
                        desktop: isBleedActivated && !sideBySideExtraOnDesktop ? 32 : noPaddingY ? 0 : 48,
                    }}
                >
                    {sideBySideExtraOnDesktop ? (
                        <GridLayout
                            template="6+6"
                            left={mainContent}
                            right={
                                <div className={isBleedActivated ? styles.hideOnTabletOrSmaller : ''}>
                                    <Box paddingTop={{mobile: header ? 24 : 0, desktop: 0}}>{extra}</Box>
                                </div>
                            }
                        />
                    ) : (
                        <Stack space={header ? {mobile: 24, desktop: 32} : 0}>
                            {mainContent}
                            {!isBleedActivated && extra}
                        </Stack>
                    )}
                </Box>
            </ResponsiveLayout>
            {isBleedActivated && (
                <ResponsiveLayout
                    className={sideBySideExtraOnDesktop ? styles.hideOnDesktop : ''}
                    backgroundColor={`linear-gradient(to bottom, ${vars.colors.backgroundBrandBottom} 40px, ${vars.colors.background} 0%)`}
                >
                    {extra}
                </ResponsiveLayout>
            )}
        </div>
    );
};

type MainSectionHeaderLayoutProps = {
    isInverse?: boolean;
    children: RendersElement<typeof MainSectionHeader>;
    dataAttributes?: DataAttributes;
};

export const MainSectionHeaderLayout = ({
    isInverse = true,
    children,
    dataAttributes,
}: MainSectionHeaderLayoutProps): JSX.Element => {
    useSetOverscrollColor(isInverse ? {topColor: vars.colors.backgroundBrandTop} : {});
    return (
        <ResponsiveLayout
            isInverse={isInverse}
            dataAttributes={{'component-name': 'MainSectionHeaderLayout', ...dataAttributes}}
        >
            <GridLayout
                template="6+6"
                left={
                    <Box paddingTop={{mobile: 12, desktop: 48}} paddingBottom={{mobile: 24, desktop: 48}}>
                        {children}
                    </Box>
                }
                right={null}
            />
        </ResponsiveLayout>
    );
};
