// https://www.figma.com/file/35iS2dwoogulJZPgFGKmCX/Explora%C3%A7%C3%A3o-Data-Card-%2F-Slots?type=design&node-id=443-32508&mode=design&t=wwoi2TRLVsjwGYAb-0

'use client';
import * as React from 'react';
import {Boxed} from '../boxed';
import {sprinkles} from '../sprinkles.css';
import Stack from '../stack';
import * as styles from './advanced-data-card.css';
import * as mediaStyles from '../image.css';
import Divider from '../divider';
import {Text2, Text, textProps} from '../text';
import {vars} from '../skins/skin-contract.css';
import Box from '../box';
import Touchable from '../touchable';
import classNames from 'classnames';
import {CardActionsGroup} from '../card';
import {useTheme} from '../hooks';
import {getPrefixedDataAttributes} from '../utils/dom';
import Inline from '../inline';
import {applyCssVars} from '../utils/css';

import type {PressHandler} from '../touchable';
import type {ExclusifyUnion} from '../utils/utility-types';
import type {CardAction} from '../card';
import type StackingGroup from '../stacking-group';
import type Image from '../image';
import type {ButtonPrimary, ButtonLink} from '../button';
import type {DataAttributes, TrackingEvent} from '../utils/types';
import type {RendersNullableElement} from '../utils/renders-element';
import type Tag from '../tag';
import type {
    HighlightedValueBlock,
    InformationBlock,
    ProgressBlock,
    RowBlock,
    SimpleBlock,
    ValueBlock,
} from './blocks';

type TouchableProps = {
    trackingEvent?: TrackingEvent | ReadonlyArray<TrackingEvent>;
    role?: string;
} & ExclusifyUnion<
    | {
          href: string | undefined;
          newTab?: boolean;
      }
    | {
          to: string | undefined;
          newTab?: boolean;
          fullPageOnWebView?: boolean;
      }
    | {
          onPress: PressHandler | undefined;
      }
>;
type TouchableCard<T> = T & TouchableProps;
type MaybeTouchableCard<T> = ExclusifyUnion<TouchableCard<T> | T>;

type CardContentProps = MaybeTouchableCard<{
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
    ariaLabel?: string;
}>;

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
    ariaLabel,
    ...touchableProps
}) => {
    const {textPresets} = useTheme();

    return (
        <Stack space={4}>
            {headline}
            <Touchable
                tabIndex={0}
                maybe
                className={classNames(styles.touchableArea)}
                {...touchableProps}
                aria-label={ariaLabel}
            >
                <></>
            </Touchable>
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

            <Text
                {...textProps.text4}
                truncate={titleLinesMax}
                weight={textPresets.cardTitle.weight}
                as={titleAs}
                hyphens="auto"
            >
                {title}
            </Text>
            <Text2 color={vars.colors.textPrimary} truncate={subtitleLinesMax} as="p" regular hyphens="auto">
                {subtitle}
            </Text2>
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
                            <div
                                style={applyCssVars({
                                    [mediaStyles.vars.mediaBorderRadius]: vars.borderRadii.mediaSmall,
                                })}
                            >
                                {footerImage}
                            </div>
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

type AllowedExtra =
    | typeof StackingGroup
    | typeof HighlightedValueBlock
    | typeof InformationBlock
    | typeof ProgressBlock
    | typeof RowBlock
    | typeof SimpleBlock
    | typeof ValueBlock;

type TextAs = 'h1' | 'h2' | 'h3' | 'h4';

type AdvancedDataCardProps = MaybeTouchableCard<{
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
    extra?: ReadonlyArray<RendersNullableElement<AllowedExtra>>;
    extraDividerPadding?: 8 | 24;
    button?: RendersNullableElement<typeof ButtonPrimary>;
    footerImage?: RendersNullableElement<typeof Image>;
    footerText?: string;
    footerTextLinesMax?: number;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
    dataAttributes?: DataAttributes;
    actions?: ReadonlyArray<CardAction | React.ReactElement>;
    'aria-label'?: string;
    onClose?: () => void;
}>;

export const AdvancedDataCard = React.forwardRef<HTMLDivElement, AdvancedDataCardProps>(
    (
        {
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
            ...touchableProps
        },
        ref
    ) => {
        const isTouchable = !!touchableProps.href || !!touchableProps.onPress || !!touchableProps.to;

        const footerProps = {button, footerImage, footerText, footerTextLinesMax, buttonLink};

        const hasFooter = !!button || !!footerImage || !!footerText || !!buttonLink;
        const hasExtras = !!extra?.length;

        const topActionsCount = (actions?.length || 0) + (onClose ? 1 : 0);

        return (
            <section
                className={sprinkles({
                    position: 'relative',
                    height: '100%',
                })}
                {...getPrefixedDataAttributes(dataAttributes, 'AdvancedDataCard')}
                ref={ref}
                aria-label={ariaLabel}
            >
                <Boxed className={styles.dataCard} width="100%" height="100%" minHeight={styles.MIN_HEIGHT}>
                    <div className={styles.touchableContainer}>
                        {isTouchable && <div className={styles.touchableCardOverlay} />}

                        <div
                            className={classNames(
                                styles.cardContentStyle,
                                !hasFooter && !hasExtras ? styles.minHeight : ''
                            )}
                        >
                            <Box paddingTop={8}>
                                <Inline space={0}>
                                    <Stack space={8}>
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
                                            ariaLabel={ariaLabel}
                                            {...touchableProps}
                                        />
                                    </Stack>
                                    {/** Hack to avoid content from rendering on top of the top action buttons */}
                                    {!stackingGroup && (
                                        <div
                                            style={applyCssVars({
                                                [styles.vars.topActionsCount]: String(topActionsCount),
                                            })}
                                            className={styles.topActionsWithoutIcon}
                                        />
                                    )}
                                </Inline>
                            </Box>
                        </div>
                        <div style={{flexGrow: 1}} />
                        {hasExtras && (
                            <Box paddingTop={16} paddingBottom={24} width="100%" className={styles.zindex}>
                                {extra.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div className={styles.paddingX}>{item}</div>

                                            {index + 1 !== extra.length && (
                                                <Box paddingY={extraDividerPadding}>
                                                    <Divider />
                                                </Box>
                                            )}
                                        </div>
                                    );
                                })}
                            </Box>
                        )}
                        {/**
                         * Given that the actions are inside the card content, there is a 1px padding that affects their position in the card.
                         * By default, all the other cards use padding of 8px for the actions, so we use 7px in here to compensate for
                         * that extra pixel that was added by the <Boxed/> component.
                         */}
                        <CardActionsGroup actions={actions} onClose={onClose} padding={15} />
                    </div>
                    {hasFooter && <CardFooter {...footerProps} />}
                </Boxed>
            </section>
        );
    }
);

export default AdvancedDataCard;
