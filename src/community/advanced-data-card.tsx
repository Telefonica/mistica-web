// https://www.figma.com/file/35iS2dwoogulJZPgFGKmCX/Explora%C3%A7%C3%A3o-Data-Card-%2F-Slots?type=design&node-id=443-32508&mode=design&t=wwoi2TRLVsjwGYAb-0

'use client';
import * as React from 'react';
import {Boxed} from '../boxed';
import Stack from '../stack';
import * as styles from './advanced-data-card.css';
import * as mediaStyles from '../image.css';
import Divider from '../divider';
import {Text2, Text, useTextPresetSizes} from '../text';
import {vars} from '../skins/skin-contract.css';
import Box from '../box';
import Touchable from '../touchable';
import classNames from 'classnames';
import {useInnerText, useTheme} from '../hooks';
import {getPrefixedDataAttributes} from '../utils/dom';
import Inline from '../inline';
import {applyCssVars} from '../utils/css';
import Tag from '../tag';
import {isBiggerHeading} from '../utils/headings';
import {TopActions} from '../card-internal';

import type {CardAction} from '../card-internal';
import type {PressHandler} from '../touchable';
import type {ExclusifyUnion} from '../utils/utility-types';
import type StackingGroup from '../stacking-group';
import type Image from '../image';
import type {ButtonPrimary, ButtonLink} from '../button';
import type {DataAttributes, HeadingType, TrackingEvent} from '../utils/types';
import type {RendersNullableElement} from '../utils/renders-element';
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

type CardContentProps = {
    headline?: string | RendersNullableElement<typeof Tag>;
    headlineRef?: (instance: HTMLElement | null) => void;
    pretitle?: string;
    pretitleAs?: HeadingType;
    pretitleLinesMax?: number;
    title?: string;
    titleAs: HeadingType;
    titleLinesMax?: number;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
};

const CardContent = ({
    headline,
    headlineRef,
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
}: CardContentProps) => {
    const {textPresets} = useTheme();
    const text4Sizes = useTextPresetSizes('text4');

    return (
        /** using flex instead of nested Stacks, this way we can rearrange texts so the DOM structure makes more sense for screen reader users */
        <div className={styles.flexColumn}>
            {isBiggerHeading(titleAs, pretitleAs) ? (
                <>
                    {title && (
                        <div style={{paddingBottom: subtitle || description ? 4 : 0}}>
                            <Text
                                {...text4Sizes}
                                truncate={titleLinesMax}
                                weight={textPresets.cardTitle.weight}
                                as={titleAs}
                                hyphens="auto"
                            >
                                {title}
                            </Text>
                        </div>
                    )}
                    {headline && (
                        <div
                            ref={headlineRef}
                            style={{
                                order: -2,
                                paddingBottom: pretitle || title || subtitle || description ? 4 : 0,
                            }}
                        >
                            {typeof headline === 'string' ? <Tag type="promo">{headline}</Tag> : headline}
                        </div>
                    )}
                    {pretitle && (
                        <div style={{order: -1, paddingBottom: title || subtitle || description ? 4 : 0}}>
                            <Text2 truncate={pretitleLinesMax} as={pretitleAs} regular hyphens="auto">
                                {pretitle}
                            </Text2>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {pretitle && (
                        <div style={{paddingBottom: title || subtitle || description ? 4 : 0}}>
                            <Text2 truncate={pretitleLinesMax} as={pretitleAs} regular hyphens="auto">
                                {pretitle}
                            </Text2>
                        </div>
                    )}
                    {headline && (
                        <div
                            ref={headlineRef}
                            style={{
                                order: -1,
                                paddingBottom: pretitle || title || subtitle || description ? 4 : 0,
                            }}
                        >
                            {typeof headline === 'string' ? <Tag type="promo">{headline}</Tag> : headline}
                        </div>
                    )}
                    {title && (
                        <div style={{paddingBottom: subtitle || description ? 4 : 0}}>
                            <Text
                                {...text4Sizes}
                                truncate={titleLinesMax}
                                weight={textPresets.cardTitle.weight}
                                as={titleAs}
                                hyphens="auto"
                            >
                                {title}
                            </Text>
                        </div>
                    )}
                </>
            )}
            {subtitle && (
                <div style={{paddingBottom: description ? 4 : 0}}>
                    <Text2 truncate={subtitleLinesMax} as="div" regular hyphens="auto">
                        {subtitle}
                    </Text2>
                </div>
            )}
            {description && (
                <Text2
                    truncate={descriptionLinesMax}
                    as="div"
                    regular
                    color={vars.colors.textSecondary}
                    hyphens="auto"
                >
                    {description}
                </Text2>
            )}
        </div>
    );
};

type CardFooterProps = {
    button?: RendersNullableElement<typeof ButtonPrimary>;
    footerImage?: RendersNullableElement<typeof Image>;
    footerText?: string;
    footerTextLinesMax?: number;
    buttonLink?: RendersNullableElement<typeof ButtonLink>;
};

const CardFooter = ({button, footerImage, footerText, footerTextLinesMax, buttonLink}: CardFooterProps) => {
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
                        hasAllItens ? styles.marginRightAuto : styles.withPaddingTop
                    )}
                >
                    {hasFooterImage && (
                        <div className={styles.footerImage}>
                            <div
                                style={applyCssVars({
                                    [mediaStyles.vars.mediaBorderRadius]: vars.borderRadii.mediaSmall,
                                })}
                            >
                                {footerImage}
                            </div>
                        </div>
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

type AdvancedDataCardProps = MaybeTouchableCard<{
    stackingGroup?: RendersNullableElement<typeof StackingGroup>;
    headline?: RendersNullableElement<typeof Tag>;
    pretitle?: string;
    pretitleLinesMax?: number;
    pretitleAs?: HeadingType;
    title?: string;
    titleLinesMax?: number;
    titleAs?: HeadingType;
    subtitle?: string;
    subtitleLinesMax?: number;
    description?: string;
    descriptionLinesMax?: number;
    extra?: ReadonlyArray<RendersNullableElement<AllowedExtra>>;
    extraDividerPadding?: 8 | 16 | 24;
    noExtraDivider?: boolean;
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
            titleAs = 'h3',
            titleLinesMax,
            subtitle,
            subtitleLinesMax,
            description,
            descriptionLinesMax,

            extra,
            extraDividerPadding = 24,
            noExtraDivider = false,

            button,
            footerImage,
            footerText,
            footerTextLinesMax,
            buttonLink,

            dataAttributes,
            actions,
            'aria-label': ariaLabelProp,
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

        const {text: headlineText, ref: headlineRef} = useInnerText();
        const {text: extraText, ref: extraRef} = useInnerText();

        const ariaLabel =
            ariaLabelProp ||
            (isBiggerHeading(titleAs, pretitleAs)
                ? [title, headlineText, pretitle, subtitle, description, extraText]
                : [pretitle, headlineText, title, subtitle, description, extraText]
            )
                .filter(Boolean)
                .join(' ');

        return (
            <section
                className={styles.container}
                {...getPrefixedDataAttributes(dataAttributes, 'AdvancedDataCard')}
                ref={ref}
                aria-label={isTouchable ? undefined : ariaLabel}
            >
                <Boxed className={styles.dataCard} width="100%" height="100%" minHeight={styles.MIN_HEIGHT}>
                    <Touchable
                        maybe
                        {...touchableProps}
                        aria-label={isTouchable ? ariaLabel : undefined}
                        className={styles.touchable}
                    >
                        {isTouchable && <div className={styles.touchableCardHoverOverlay} />}

                        <div
                            className={classNames(
                                styles.cardContentStyle,
                                !hasFooter && !hasExtras ? styles.minHeight : ''
                            )}
                            aria-hidden={isTouchable}
                        >
                            <Box paddingTop={8}>
                                <Inline space={0}>
                                    <Stack space={8}>
                                        {stackingGroup}
                                        <CardContent
                                            headline={headline}
                                            headlineRef={headlineRef}
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
                            <div className={styles.extra} ref={extraRef} aria-hidden={isTouchable}>
                                {extra.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div className={styles.paddingX}>{item}</div>

                                            {index + 1 !== extra.length && (
                                                <Box paddingY={extraDividerPadding}>
                                                    {!noExtraDivider && <Divider />}
                                                </Box>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </Touchable>
                    {hasFooter && <CardFooter {...footerProps} />}
                </Boxed>
                <TopActions actions={actions} onClose={onClose} />
            </section>
        );
    }
);

export default AdvancedDataCard;
