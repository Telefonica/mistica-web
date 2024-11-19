'use client';
import * as React from 'react';
import Box from './box';
import Stack from './stack';
import ResponsiveLayout from './responsive-layout';
import GridLayout from './grid-layout';
import {useSetOverscrollColor} from './overscroll-color-context';
import {Text7, Text6, Text3, Text2} from './text';
import {vars} from './skins/skin-contract.css';
import * as styles from './header.css';
import {getPrefixedDataAttributes} from './utils/dom';
import {Title3, Title4} from './title';

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
}: HeaderProps): JSX.Element => {
    const renderPretitle = () => {
        if (!pretitle) {
            return null;
        }
        const baseTextProps = {
            regular: true,
            color: vars.colors.textPrimary,
            as: pretitleAs,
            dataAttributes: {testid: 'pretitle'},
        } as const;

        if (typeof pretitle === 'string') {
            return <Text3 {...baseTextProps}>{pretitle}</Text3>;
        }
        const {text, ...textProps} = pretitle;
        return (
            <Text3 {...baseTextProps} {...textProps}>
                {text}
            </Text3>
        );
    };

    return (
        <Stack space={{mobile: 24, desktop: 32}} dataAttributes={{testid: 'Header', ...dataAttributes}}>
            {(title || pretitle || description) && (
                <Box paddingRight={16}>
                    <Stack space={8}>
                        {headline && <div data-testid="headline">{headline}</div>}
                        {renderPretitle()}
                        {title &&
                            (small ? (
                                <Title3 as={titleAs} dataAttributes={{testid: 'title'}}>
                                    {title}
                                </Title3>
                            ) : (
                                <Title4 as={titleAs} dataAttributes={{testid: 'title'}}>
                                    {title}
                                </Title4>
                            ))}
                        {description &&
                            (small ? (
                                <Text2
                                    regular
                                    color={vars.colors.textSecondary}
                                    dataAttributes={{testid: 'description'}}
                                >
                                    {description}
                                </Text2>
                            ) : (
                                <Text3
                                    regular
                                    color={vars.colors.textSecondary}
                                    dataAttributes={{testid: 'description'}}
                                >
                                    {description}
                                </Text3>
                            ))}
                    </Stack>
                </Box>
            )}
        </Stack>
    );
};

type MainSectionHeaderProps = {
    title: string;
    titleAs?: HeadingType;
    description?: string;
    button?: RendersNullableElement<typeof ButtonPrimary> | RendersNullableElement<typeof ButtonSecondary>;
    dataAttributes?: DataAttributes;
};

export const MainSectionHeader = ({
    title,
    titleAs = 'h1',
    description,
    button,
    dataAttributes,
}: MainSectionHeaderProps): JSX.Element => {
    return (
        <Stack
            space={32}
            dataAttributes={{
                testid: 'MainSectionHeader',
                ...dataAttributes,
            }}
        >
            <Stack space={{mobile: 12, desktop: 16}}>
                {title && (
                    <Text7 as={titleAs} dataAttributes={{testid: 'title'}}>
                        {title}
                    </Text7>
                )}
                {description && <Text6 dataAttributes={{testid: 'description'}}>{description}</Text6>}
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
    isInverse = false,
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
        <div {...getPrefixedDataAttributes(dataAttributes, 'HeaderLayout')}>
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
    isInverse = false,
    children,
    dataAttributes,
}: MainSectionHeaderLayoutProps): JSX.Element => {
    useSetOverscrollColor(isInverse ? {topColor: vars.colors.backgroundBrandTop} : {});
    return (
        <ResponsiveLayout
            isInverse={isInverse}
            dataAttributes={{
                'component-name': 'MainSectionHeaderLayout',
                testid: 'MainSectionHeaderLayout',
                ...dataAttributes,
            }}
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
