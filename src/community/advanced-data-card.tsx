import * as React from 'react';
import {Boxed} from '../boxed';
import {sprinkles} from '../sprinkles.css';
import Stack from '../stack';
import * as styles from './advanced-data-card.css';
import Divider from '../divider';
import {Text2, Text4} from '../text';
import {vars} from '../skins/skin-contract.css';
import Box from '../box';
import Touchable from '../touchable';
import classNames from 'classnames';
import {CardActionsGroup} from '../card';

import type {CardAction} from '../card';
import type StackingGroup from '../stacking-group';
import type Image from '../image';
import type {ButtonPrimary, ButtonLink} from '../button';
import type {DataAttributes} from '../utils/types';
import type {RendersNullableElement} from '../utils/renders-element';
import type Tag from '../tag';

type CardContentProps = {
    headline?: string | RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleAs?: string;
    pretitleLinesMax?: number;
    title?: string;
    titleAs?: string;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
};

const CardContent: React.FC<CardContentProps> = ({
    headline,
    pretitle,
    pretitleAs = 'p',
    pretitleLinesMax,
    title,
    titleAs = 'h3',
    titleLinesMax,
    subtitle,
    subtitleLinesMax,
    description,
    descriptionLinesMax,
}) => {
    return (
        <>
            <Stack space={4}>
                <header>
                    <Stack space={4}>
                        {headline}
                        <Stack space={4}>
                            {pretitle && (
                                <Text2
                                    color={vars.colors.textPrimary}
                                    truncate={pretitleLinesMax}
                                    as={pretitleAs}
                                    regular
                                    hyphens="auto"
                                >
                                    {pretitle}
                                </Text2>
                            )}
                            <Text4
                                color={vars.colors.textPrimary}
                                truncate={titleLinesMax}
                                weight="regular"
                                as={titleAs}
                                hyphens="auto"
                            >
                                {title}
                            </Text4>
                            <Text2
                                color={vars.colors.textPrimary}
                                truncate={subtitleLinesMax}
                                as="p"
                                regular
                                hyphens="auto"
                            >
                                {subtitle}
                            </Text2>
                        </Stack>
                    </Stack>
                </header>

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
        </>
    );
};

type CardFooterProps = {
    button?: RendersNullableElement<typeof ButtonPrimary>;
    footerImage?: RendersNullableElement<typeof Image>;
    footerText?: string;
    footerTextLinesMax?: number;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
};

const CardFooter: React.FC<CardFooterProps> = ({
    button,
    footerImage,
    footerText,
    footerTextLinesMax,
    buttonLink,
}) => {
    const hasButton = !!button;
    const hasFooterImage = !!footerImage;
    const hasFooterText = !!footerText;
    const hasButtonLink = !!buttonLink;
    const hasAllItens = hasButton && (hasFooterImage || hasFooterText) && hasButtonLink;

    const maxWidth = hasButtonLink && !hasAllItens ? '178px' : '';

    return (
        <>
            <div className={styles.divider}>
                <Divider />
            </div>

            <div
                className={classNames(
                    styles.actions,
                    styles.actionsVariants[hasAllItens ? 'mobile' : 'default']
                )}
            >
                {hasButton && (
                    <div className={classNames(styles.marginRightButton, styles.buttonMobile)}>{button}</div>
                )}
                <div
                    className={classNames(
                        styles.footerDirection,
                        hasAllItens
                            ? styles.marginRightAuto
                            : sprinkles({
                                  paddingTop: 16,
                              })
                    )}
                >
                    {hasFooterImage && (
                        <Box paddingRight={16} className={sprinkles({alignItems: 'center', display: 'flex'})}>
                            {footerImage}
                        </Box>
                    )}

                    {hasFooterText && (
                        <div style={{maxWidth}} className={styles.footerText}>
                            <Text2 truncate={footerTextLinesMax} regular>
                                {footerText}
                            </Text2>
                        </div>
                    )}
                </div>
                {hasButtonLink && (
                    <div
                        className={classNames(
                            styles.adjustButtonLink,
                            hasAllItens ? styles.button : styles.buttonMobile
                        )}
                    >
                        {buttonLink}
                    </div>
                )}
            </div>
        </>
    );
};

type AllowedExtra = typeof StackingGroup;

type TextAs = 'h1' | 'h2' | 'h3' | 'h4';

interface AdvancedDataCardProps {
    onPress?: () => void;
    stackingGroup?: RendersNullableElement<typeof StackingGroup>;
    headline?: RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    pretitleAs?: TextAs;
    title?: string;
    titleLinesMax?: number;
    titleAs?: TextAs;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    extra?: Array<RendersNullableElement<AllowedExtra>>;
    extraDividerPadding?: 8 | 24;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    footerImage?: RendersNullableElement<typeof Image>;
    footerText?: string;
    footerTextLinesMax?: number;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
    dataAttributes?: DataAttributes;
    actions?: Array<CardAction>;
    'aria-label'?: string;
    onClose?: () => void;
}

export const AdvancedDataCard = React.forwardRef<HTMLDivElement, AdvancedDataCardProps>(
    (
        {
            onPress,

            stackingGroup,
            headline,
            pretitle,
            pretitleAs,
            pretitleLinesMax,
            title,
            titleAs,
            titleLinesMax,
            subtitle,
            subtitleLinesMax,
            description,
            descriptionLinesMax,

            extra,
            extraDividerPadding = 24,

            button,
            footerImage,
            footerText,
            footerTextLinesMax,
            buttonLink,

            dataAttributes,
            actions,
            'aria-label': ariaLabel,
            onClose,
        },
        ref
    ) => {
        const footerProps = {button, footerImage, footerText, footerTextLinesMax, buttonLink};

        const hasFooter = !!button || !!footerImage || !!footerText || !!buttonLink;

        return (
            <section
                aria-label={ariaLabel}
                className={sprinkles({
                    position: 'relative',
                    height: '100%',
                })}
            >
                <Boxed
                    className={styles.boxed}
                    dataAttributes={{'component-name': 'AdvancedDataCard', ...dataAttributes}}
                    ref={ref}
                    width="100%"
                    height="100%"
                >
                    <div className={styles.dataCard}>
                        <Touchable
                            onPress={onPress}
                            tabIndex={0}
                            maybe
                            className={sprinkles({
                                position: 'relative',
                                height: '100%',
                            })}
                        >
                            <div className={onPress ? styles.interaction : ''}>
                                <div
                                    className={classNames(
                                        styles.cardContentStyle,
                                        !hasFooter && !extra ? styles.minHeight : ''
                                    )}
                                >
                                    <Box paddingTop={8}>
                                        <Stack space={8} className={sprinkles({flex: 1})}>
                                            {stackingGroup}
                                            <CardContent
                                                headline={headline}
                                                pretitle={pretitle}
                                                pretitleAs={pretitleAs}
                                                pretitleLinesMax={pretitleLinesMax}
                                                title={title}
                                                titleAs={titleAs}
                                                titleLinesMax={titleLinesMax}
                                                subtitle={subtitle}
                                                subtitleLinesMax={subtitleLinesMax}
                                                description={description}
                                                descriptionLinesMax={descriptionLinesMax}
                                            />
                                        </Stack>
                                    </Box>
                                    <CardActionsGroup actions={actions} onClose={onClose} />
                                </div>
                                <div className={styles.extraTop}>
                                    {extra && extra?.length ? (
                                        <Box paddingTop={16} paddingBottom={24}>
                                            {extra.map((ex, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div
                                                            className={sprinkles({
                                                                display: 'flex',
                                                                width: '100%',
                                                            })}
                                                        >
                                                            <div
                                                                className={classNames(
                                                                    sprinkles({width: '100%'}),
                                                                    styles.paddingX
                                                                )}
                                                            >
                                                                {ex}
                                                            </div>
                                                        </div>

                                                        {index + 1 !== extra.length && (
                                                            <Box paddingY={extraDividerPadding}>
                                                                <Divider />
                                                            </Box>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </Box>
                                    ) : null}
                                </div>
                            </div>
                        </Touchable>
                        {hasFooter && <CardFooter {...footerProps} />}
                    </div>
                </Boxed>
            </section>
        );
    }
);

export default AdvancedDataCard;
