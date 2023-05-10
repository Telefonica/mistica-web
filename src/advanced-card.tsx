import * as React from 'react';
import {Boxed} from './boxed';
import {sprinkles} from './sprinkles.css';
import Stack from './stack';
import * as styles from './advanced-card.css';
import Image from './image';
import IconMeatballFilled from './generated/mistica-icons/icon-meatball-filled';
import Divider from './divider';
import NegativeBox from './negative-box';
import {Placeholder} from './placeholder';
import Text, {Text2} from './text';
import Tag from './tag';
import {useTheme} from './hooks';
import {vars} from './skins/skin-contract.css';
import {style} from '@vanilla-extract/css';

import type {RendersNullableElement} from './utils/renders-element';
import type {DataAttributes} from './utils/types';
import type {ButtonPrimary, ButtonLink} from './button';

type CardContentProps = {
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    extra?: React.ReactNode;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
};

const CardContent: React.FC<CardContentProps> = ({
    headline,
    pretitle,
    pretitleLinesMax,
    title,
    titleLinesMax,
    subtitle,
    subtitleLinesMax,
    description,
    descriptionLinesMax,
}) => {
    const {textPresets} = useTheme();
    const renderHeadline = () => {
        if (!headline) {
            return null;
        }
        if (typeof headline === 'string') {
            return <Tag type="promo">{headline}</Tag>;
        }
        return headline;
    };
    return (
        <div>
            <Stack space={8}>
                {(headline || pretitle || title || subtitle) && (
                    <header>
                        <Stack space={8}>
                            {renderHeadline()}
                            <Stack space={4}>
                                {pretitle && (
                                    <Text2 truncate={pretitleLinesMax} as="div" regular hyphens="auto">
                                        {pretitle}
                                    </Text2>
                                )}
                                <Text
                                    mobileSize={18}
                                    mobileLineHeight="24px"
                                    desktopSize={20}
                                    desktopLineHeight="28px"
                                    truncate={titleLinesMax}
                                    weight={textPresets.cardTitle.weight}
                                    as="h3"
                                    hyphens="auto"
                                >
                                    {title}
                                </Text>
                                <Text2 truncate={subtitleLinesMax} as="div" regular hyphens="auto">
                                    {subtitle}
                                </Text2>
                            </Stack>
                        </Stack>
                    </header>
                )}

                {description && (
                    <Text2
                        truncate={descriptionLinesMax}
                        as="p"
                        regular
                        color={vars.colors.textSecondary}
                        hyphens="auto"
                    >
                        {description}
                    </Text2>
                )}
            </Stack>
        </div>
    );
};

interface AdvancedDataCardProps {
    icon?: React.ReactElement;
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    title?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;

    slot?: React.ReactNode;

    showOptions?: boolean;
    dataAttributes?: DataAttributes;

    button?: RendersNullableElement<typeof ButtonPrimary>;
    image?: string;
    footerText?: string;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
    'aria-label'?: string;
    onClose?: () => void;
}

const AdvancedDataCard = React.forwardRef<HTMLDivElement, AdvancedDataCardProps>(
    (
        {
            icon,
            headline,
            pretitle,
            pretitleLinesMax,
            title,
            titleLinesMax,
            subtitle,
            subtitleLinesMax,
            description,
            descriptionLinesMax,

            showOptions,

            button,
            image,
            footerText,
            buttonLink,

            dataAttributes,
            'aria-label': ariaLabel,
            onClose,
        },
        ref
    ) => {
        const hasIcon = !!icon;
        const hasButton = !!button;
        const hasImage = !!image;
        const hasFooterText = !!footerText;
        const hasButtonLink = !!buttonLink;
        const hasFooter = hasButton || hasImage || hasFooterText || hasButtonLink;

        const margin = {marginLeft: '16px'};

        const topActionsStylesWithIcon = {position: 'absolute', top: 8, right: 8, zIndex: 2} as const;

        return (
            <section aria-label={ariaLabel} style={{height: '100%', position: 'relative'}}>
                <Boxed
                    className={styles.boxed}
                    dataAttributes={{'component-name': 'DataCard', ...dataAttributes}}
                    ref={ref}
                    width="100%"
                    height="100%"
                >
                    <div className={styles.dataCard}>
                        <div
                            className={sprinkles({
                                display: 'flex',
                            })}
                        >
                            <Stack space={16} className={sprinkles({flex: 1})}>
                                {hasIcon ? icon : null}
                                <CardContent
                                    headline={headline}
                                    pretitle={pretitle}
                                    pretitleLinesMax={pretitleLinesMax}
                                    title={title}
                                    titleLinesMax={titleLinesMax}
                                    subtitle={subtitle}
                                    subtitleLinesMax={subtitleLinesMax}
                                    description={description}
                                    descriptionLinesMax={descriptionLinesMax}
                                />
                            </Stack>
                            {showOptions && (
                                <div style={topActionsStylesWithIcon}>
                                    <IconMeatballFilled />
                                </div>
                            )}
                        </div>

                        <div
                            className={sprinkles({
                                paddingTop: 32,
                            })}
                        >
                            <div
                                className={sprinkles({
                                    paddingY: 24,
                                })}
                            >
                                <Placeholder />
                            </div>
                        </div>

                        {hasFooter && (
                            <NegativeBox>
                                <Divider />
                            </NegativeBox>
                        )}

                        <div className={styles.actions}>
                            {hasButton && button}
                            {hasImage && (
                                <div
                                    style={hasButton ? margin : {}}
                                    className={sprinkles({alignItems: 'center', display: 'flex'})}
                                >
                                    <Image height={40} src={image} />
                                </div>
                            )}
                            {hasFooterText && (
                                <div
                                    style={hasButton || hasImage ? margin : {}}
                                    className={styles.footerText}
                                >
                                    <Text2 medium>{footerText}</Text2>
                                </div>
                            )}
                            {hasButtonLink && buttonLink}
                        </div>
                    </div>
                </Boxed>
            </section>
        );
    }
);

export default AdvancedDataCard;
